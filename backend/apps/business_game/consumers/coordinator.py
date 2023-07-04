import time
from abc import ABC
from threading import Thread

from django.apps import apps
from services.bussines_games.deocarators.decorators import game_status_check
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import save_game
from services.bussines_games.utils.game_utils import GameStates
from services.invite_code import CodeMethods
from services.websockets.permissions import is_coordinator

from apps.business_game.consumers.connect import ConnectToGame


class CoordinatorConsumer(ConnectToGame, ABC):
    coordinator_action_and_permissions = {
        "start_game": [is_coordinator],
        "change_year": [is_coordinator],
        "new_game_code": [is_coordinator],
    }

    @game_status_check(statuses=[GameStates.lobby])
    @save_game
    def action_start_game(self):
        """Метод начала игры."""
        if True:
            # if 16 <= len(self.game.players) <= 31:
            self.game.set_game_status_in_process()
            self.game.set_role_for_users()
            self.send_to_the_group(
                data={"game_status": GameStates.in_process},
                notice=Notice.create_info_notice("Игра началась!"),
            )
            self._send_start_data()
            return
        self.send_to_channel(
            self.channel_name,
            notice=Notice.create_error_notice(
                "Невозможно начать игру. Допустимое число игроков от 16 до 31"
            ),
        )

    @game_status_check(statuses=[GameStates.lobby])
    def action_new_game_code(self):
        """."""
        game_model = apps.get_model("business_game.Game")
        game = game_model.objects.get(game_code=self.game_code)

        self.game_code = CodeMethods.generate_new_game_code(self.game_code)

        game.game_code = self.game_code
        game.save()
        self.send_to_channel(self.channel_name, data={"new_game_code": self.game_code})

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    def action_change_year(self):
        game = self.game
        game.set_game_status_changing_year()
        thread = Thread(target=self.chat_queue, daemon=True)

        thread.start()
        game.on_change_year()

    def _send_start_data(self):
        players = self.game.players
        data = {
            "data": {
                "coordinator_id": self.game.coordinator.coordinator_id,
                "game_name": self.game.game_name,
                "user_id": self.user.id,
            }
        }
        self.send_to_channel(
            self.channel_name,
            action="connect_to_game",
            data=self._merge_data(self.game.get_in_process_coordinator_data(), data),
        )

        for player_id, player in players.items():
            player_data = self.game.get_in_process_player_data(player_id)
            data["data"]["user_id"] = player_id
            data_to_send = self._merge_data(player_data, data)
            self.send_to_channel(
                player.channel, action="connect_to_game", data=data_to_send
            )

    @staticmethod
    def _merge_data(dict_1, dict_2):
        data_to_return = dict()
        data_to_return["data"] = dict_1["data"] | dict_2["data"]
        return data_to_return

    def chat_queue(self):
        def timer(message, end_message, name=""):
            for index in reversed(range(1, 11)):
                data = {
                    "user": "Console",
                    "message": message.format(index=index, name=name),
                }
                self.send_to_the_group(action="game_chat_send_message", data=data)
                time.sleep(1)
            else:
                data = {"user": "console", "message": end_message.format(name=name)}
                self.send_to_the_group(action="game_chat_send_message", data=data)

        game = self.game
        timer(
            message="До выступления президента осталось {index} сек.",
            end_message="Речь президента.",
        )
        game.set_game_status(GameStates.president_time)
        time.sleep(60)
        smi_1 = game.ministers.get_smi_1()
        timer(
            message="До выступления СМИ:{name} осталось {index} сек.",
            end_message="Речь СМИ:{name}.",
            name=smi_1.name,
        )
        time.sleep(60)
        smi_2 = game.ministers.get_smi_2()
        timer(
            message="До выступления СМИ:{name} осталось {index} сек.",
            end_message="Речь СМИ:{name}.",
            name=smi_2.name,
        )
        time.sleep(60)
        timer(
            message="Игра продолжится через {index} сек.",
            end_message="Старый год подошел к концу! "
            "Новый год не заставит себя ждать. Игра продолжается!",
        )

        game.set_game_status(GameStates.in_process)
