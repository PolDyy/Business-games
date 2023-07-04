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
from services.bussines_games.validators.data_validators import (
    AcceptOrCloseData,
    LifeTimeLicensesData,
)
from services.websockets.interface import InterfaceMinisterConsumer
from services.websockets.permissions import is_mvd, is_player


class MVDConsumer(InterfaceMinisterConsumer, ABC):
    mvd_action_and_permissions = {
        "set_licenses_life_time": [is_player, is_mvd],
        "accept_mvd_trade": [is_player, is_mvd],
        "close_mvd_trade": [is_player, is_mvd],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=LifeTimeLicensesData)
    def action_set_licenses_life_time(self):
        data: LifeTimeLicensesData = self.validated_data

        minister_mvd = self.game.get_player(self.user.id)

        result = minister_mvd.game_role.set_licenses_life_time(data)

        if not result:
            pass

        self.send_to_channel(
            minister_mvd.channel,
            data={"life_times": self.game.resources.get_life_times()},
            notice=Notice.create_info_notice(result[0]),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @update_treasury
    @send_data_to_coordinator
    @validate(validator=AcceptOrCloseData)
    def action_accept_mvd_trade(self):

        minister_mvd = self.game.get_player(self.user.id)

        result = minister_mvd.game_role.accept_trade_with_minister_mvd(
            self.validated_data.item_id
        )

        if not result[0]:
            self.send_to_channel(
                minister_mvd.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        minister_mvd, player = result

        self.send_messages_to_player_and_minister(
            player,
            minister_mvd,
            Notice.create_info_notice("Министр МВД принял обмен."),
            Notice.create_info_notice("Обмен успешно принят."),
        )
        # self.update_player_data(player)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=AcceptOrCloseData)
    def action_close_mvd_trade(self):
        minister_mvd = self.game.get_player(self.user.id)

        result = minister_mvd.game_role.close_trade_with_minister_mvd(
            self.validated_data.item_id
        )

        if not result[0]:
            self.send_to_channel(
                minister_mvd.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        minister_mvd, player = result

        self.send_messages_to_player_and_minister(
            player,
            minister_mvd,
            Notice.create_info_notice("Министр МВД отменил обмен."),
            Notice.create_info_notice("Обмен успешно отменен."),
        )
