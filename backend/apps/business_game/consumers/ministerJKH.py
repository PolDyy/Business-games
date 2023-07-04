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
from services.websockets.permissions import is_minister_jkh, is_player


class MinisterJKHConsumer(InterfaceMinisterConsumer, ABC):
    minister_jkh_action_and_permissions = {
        "accept_license_buy": [is_player, is_minister_jkh],
        "decline_license_buy": [is_player, is_minister_jkh],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @update_treasury
    @send_data_to_coordinator
    @validate(validator=AcceptOrCloseData)
    def action_accept_license_buy(self):
        data = self.validated_data

        minister_jkh = self.game.ministers.get_minister_jkh()

        result = minister_jkh.game_role.accept_trade_with_minister_jkh(data.item_id)

        if not result[0]:
            self.send_to_channel(
                minister_jkh.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        minister_mvd, player = result

        self.send_messages_to_player_and_minister(
            player,
            minister_mvd,
            Notice.create_info_notice("Министр ЖКХ подтвердил обмен."),
            Notice.create_info_notice("Обмен успешно подтвержден."),
        )
        # self.update_player_data(player)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=AcceptOrCloseData)
    def action_decline_license_buy(self):
        data = self.validated_data

        minister_jkh = self.game.ministers.get_minister_jkh()

        result = minister_jkh.game_role.close_trade_with_minister_jkh(data.item_id)

        if not result[0]:
            self.send_to_channel(
                minister_jkh.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        minister_mvd, player = result

        self.send_messages_to_player_and_minister(
            player,
            minister_mvd,
            Notice.create_info_notice("Министр ЖКХ отменил обмен."),
            Notice.create_info_notice("Обмен успешно отменен."),
        )
