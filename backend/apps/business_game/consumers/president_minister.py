from abc import ABC

from services.bussines_games.deocarators.decorators import game_status_check, validate
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import save_game
from services.bussines_games.utils.game_utils import GameStates
from services.bussines_games.validators.data_validators import WagesData
from services.websockets.permissions import is_player, is_president

from apps.business_game.consumers.connect import ConnectToGame


class PresidentConsumer(ConnectToGame, ABC):
    president_action_and_permissions = {
        "set_wages": [is_player, is_president],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=WagesData)
    def action_set_wages(self):
        """."""
        data: WagesData = self.validated_data

        total_wage = data.total_wage
        payments = data.payments

        president = self.game.get_player(self.user.id)

        is_set = president.game_role.make_paycheck(total_wage, payments)
        if is_set:
            self.send_to_channel(
                self.channel_name,
                notice=Notice.create_info_notice("Зарплата успешно назначена"),
            )
            return None
        self.send_to_channel(
            self.channel_name,
            notice=Notice.create_error_notice("В казне не достаточно средств"),
        )
