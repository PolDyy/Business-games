from abc import ABC

from asgiref.sync import async_to_sync
from services.bussines_games.bussines_games import Game, GamesContainer
from services.bussines_games.deocarators.decorators import update_lobby_players
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import GameSaver, save_game
from services.invite_code import CodeMethods
from services.websockets.base_websocket_api import WebsocketActionAPI
from services.websockets.permissions import access_true


class ConnectToGame(WebsocketActionAPI, ABC):
    connect_action_and_permissions = {
        "connect_to_game": [access_true],
    }

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.game_code = None
        self.game = None
        self.game_id = None
        self.game_group_id = None

    def action_connect_to_game(self):
        connection_data = self._get_connection_data()
        player = self.game.get_player(self.user.id)
        self.send_to_channel(
            channel_name=self.channel_name,
            player=player,
            action="connect_to_game",
            data=connection_data.get("data"),
            notice=connection_data.get("notice"),
        )

    @save_game
    @update_lobby_players
    def connect(self):
        """Метод подключения к сокету игры."""
        self.game_code = self.scope["url_route"]["kwargs"]["game_code"]
        self.game_id = CodeMethods.get_game_id_by_code(self.game_code)
        if self.game_id is not None:

            self.user = self.scope["user"]
            self.game_group_id = "game_%s" % self.game_id
            self.game: Game = self._load_game_id(self.game_id)
            if self.game:
                self._add_to_game()
                async_to_sync(self.channel_layer.group_add)(
                    self.game_group_id, self.channel_name
                )
                self.accept()
                return
        self.close()

    @staticmethod
    def _load_game_id(game_id):
        """."""
        game: Game = (
            GamesContainer().get_game_by_game_id(game_id)
            or GameSaver.load_game(game_id)
            or GameSaver.load_reserve_file(game_id)
        )
        if not game:
            return None
        GamesContainer().load_game(game)
        return game

    def _get_connection_data(self):
        status = self.game.game_status
        result = getattr(self, status)()
        result["data"]["user_id"] = self.user.id
        result["data"]["coordinator_id"] = self.game.coordinator.coordinator_id
        result["data"]["game_name"] = self.game.game_name
        return result

    def get_in_process_data(self, user_id):
        result = self.in_process(user_id)
        result["data"]["user_id"] = self.user.id
        result["data"]["coordinator_id"] = self.game.coordinator.coordinator_id
        result["data"]["game_name"] = self.game.game_name
        return result

    def lobby(self):
        data = self.game.get_lobby_data(self.user.id)
        return data

    def in_process(self, user_id=None):
        if not user_id:
            user_id = self.user.id
        if self.game.is_coordinator(user_id):
            data = self.game.get_in_process_coordinator_data()
        else:
            data = self.game.get_in_process_player_data(user_id)
        return data

    @staticmethod
    def changing_year():
        data = {
            "notice": Notice.create_info_notice(
                "Происходит смена года. Перейдите в чат."
            ),
        }
        return data

    def _add_to_game(self):

        if self.user.id == self.game.coordinator.coordinator_id:
            self.game.coordinator.connect(self.game, self.channel_name)
            return

        player = self.game.get_player(self.user.id)
        if not player:
            name = self.user.get_full_name() or self.user.email
            result = self.game.add_player(self.user.id, name, self.channel_name)
            if not result:
                self.send_to_channel(
                    self.channel_name,
                    notice=Notice.create_error_notice(
                        "Игра уже началась."
                        " К сожалению, вы не успели подключится вовремя."
                    ),
                )
                self.close()
        else:
            player.update_channel(self.channel_name)


class DisconnectFromGame(ConnectToGame):
    def disconnect(self, close_code):
        try:
            if not self.game.is_coordinator(self.user.id):
                self.send_to_channel(
                    self.game.coordinator.channel,
                    action="update_lobby_players",
                    data={
                        "players": self.game.get_players_name_and_id(self.user.id),
                    },
                )
        except AttributeError:
            pass
        super().disconnect(close_code)
