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
from services.websockets.permissions import is_education_minister, is_player


class EducationsMinisterConsumer(InterfaceMinisterConsumer, ABC):
    educations_minister_action_and_permissions = {
        "accept_diploma_buy": [is_player, is_education_minister],
        "decline_diploma_buy": [is_player, is_education_minister],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @update_treasury
    @send_data_to_coordinator
    @validate(validator=AcceptOrCloseData)
    def action_accept_diploma_buy(self):
        data = self.validated_data

        minister_education = self.game.ministers.get_minister_education()

        result = minister_education.game_role.accept_trade_with_minister_education(
            data.item_id
        )

        if not result[0]:
            self.send_to_channel(
                minister_education.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        minister_education, player = result

        self.send_messages_to_player_and_minister(
            player,
            minister_education,
            Notice.create_info_notice("Министр Образования подтвердил обмен."),
            Notice.create_info_notice("Обмен успешно подтвержден."),
        )
        # self.update_player_data(player)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=AcceptOrCloseData)
    def action_decline_diploma_buy(self):
        data = self.validated_data

        minister_education = self.game.ministers.get_minister_education()

        result = minister_education.game_role.close_trade_with_minister_education(
            data.item_id
        )

        if not result[0]:
            self.send_to_channel(
                minister_education.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        minister_education, player = result

        self.send_messages_to_player_and_minister(
            player,
            minister_education,
            Notice.create_info_notice("Министр Образования отменил обмен."),
            Notice.create_info_notice("Обмен успешно отменен."),
        )
