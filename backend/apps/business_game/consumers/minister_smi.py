from abc import ABC

from services.bussines_games.deocarators.decorators import (
    game_status_check,
    send_data_to_coordinator,
    update_treasury,
    validate,
)
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import save_game
from services.bussines_games.utils.game_utils import GameStates
from services.bussines_games.validators.data_validators import AcceptOrCloseData
from services.websockets.interface import InterfaceMinisterConsumer
from services.websockets.permissions import is_player, is_smi


class SMIConsumer(InterfaceMinisterConsumer, ABC):
    minister_smi_action_and_permissions = {
        "accept_advertising_buy": [is_player, is_smi],
        "decline_advertising_buy": [is_player, is_smi],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @update_treasury
    @send_data_to_coordinator
    @validate(validator=AcceptOrCloseData)
    def action_accept_advertising_buy(self):
        data = self.validated_data
        smi = self.game.get_player(self.user.id)

        result = smi.game_role.accept_trade_with_smi(data.item_id)

        if not result[0]:
            self.send_to_channel(
                smi.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        smi, player = result

        self.send_messages_to_player_and_minister(
            player,
            smi,
            Notice.create_info_notice("СМИ приняло предложение."),
            Notice.create_info_notice("Предложение принято."),
        )
        # self.update_player_data(player)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=AcceptOrCloseData)
    def action_decline_advertising_buy(self):
        data = self.validated_data

        smi = self.game.get_player(self.user.id)

        result = smi.game_role.close_trade_with_smi(data.item_id)

        if not result[0]:
            self.send_to_channel(
                smi.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        minister_education, player = result

        self.send_messages_to_player_and_minister(
            player,
            minister_education,
            Notice.create_info_notice("СМИ отклонило предложение."),
            Notice.create_info_notice("Предложение успешно отклонено."),
        )
