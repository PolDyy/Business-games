from abc import ABC

from services.bussines_games.bussines_games import PlayerGame
from services.bussines_games.deocarators.decorators import validate
from services.bussines_games.validators.data_validators import (
    AllChatData,
    PrivateChatData,
)
from services.websockets.permissions import access_true

from apps.business_game.consumers.connect import ConnectToGame


class ChatConsumer(ConnectToGame, ABC):
    chat_action_and_permissions = {
        "game_chat_send_message": [access_true],
        "private_chat_send_message": [access_true],
    }

    # @game_status_check(
    #     statuses=[GameStates.in_process],
    #     special_status=[
    #         GameStates.president_time,
    #         GameStates.smi_1_time,
    #         GameStates.smi_2_time,
    #     ],
    # )
    @validate(validator=AllChatData)
    def action_game_chat_send_message(self):
        """Метод отправки сообщения в общий чат."""
        data: AllChatData = self.validated_data

        data_message = {
            "chat": "allChat",
            "user": {
                "user_id": self.user.id,
                "name": self.user.get_last_name_and_first_name(),
            },
            "message": data.message,
        }

        self.send_to_the_group(data=data_message)

    # @game_status_check(statuses=[GameStates.in_process])
    @validate(validator=PrivateChatData)
    def action_private_chat_send_message(self):
        """Метод отправки в личный чат."""
        data: PrivateChatData = self.validated_data
        self.send_private_chat_message(data.user_id, data.message)

    def send_private_chat_message(self, receiver_id, message):
        sender: PlayerGame = self.game.get_player(self.user.id)
        receiver: PlayerGame = self.game.get_player(receiver_id)
        coordinator_channel = self.game.coordinator.channel

        sender_data = {
            "chat": receiver.player_id,
            "user": {
                "user_id": sender.player_id,
                "name": sender.name,
            },
            "message": message,
        }
        receiver_data = {
            "chat": sender.player_id,
            "user": {
                "user_id": sender.player_id,
                "name": sender.name,
            },
            "message": message,
        }
        coordinator_data = {
            "sender": sender.name,
            "receiver": receiver.name,
            "message": message,
        }
        self.send_to_channel(sender.channel, data=sender_data)
        self.send_to_channel(receiver.channel, data=receiver_data)
        self.send_to_channel(coordinator_channel, data=coordinator_data)
