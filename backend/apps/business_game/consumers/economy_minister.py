from abc import ABC

from services.bussines_games.deocarators.decorators import game_status_check, validate
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import save_game
from services.bussines_games.utils.game_utils import GameStates
from services.bussines_games.validators.data_validators import Limits
from services.websockets.permissions import is_economy_minister, is_player

from apps.business_game.consumers.connect import ConnectToGame


class EconomyMinisterConsumer(ConnectToGame, ABC):
    finance_minister_action_and_permissions = {
        "set_controlled_prices": [is_player, is_economy_minister],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=Limits)
    def action_set_controlled_prices(self):
        data = self.validated_data
        minister_finance = self.game.ministers.get_minister_economy()
        minister_finance.game_role.set_limits(data)

        self.send_to_channel(
            self.channel_name,
            notice=Notice.create_info_notice("Ограничения установлены!"),
        )
