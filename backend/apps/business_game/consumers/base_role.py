from abc import ABC

from services.bussines_games.deocarators.decorators import (
    game_status_check,
    send_data_to_coordinator,
    validate,
)
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import save_game
from services.bussines_games.utils.game_utils import GameStates
from services.bussines_games.validators.data_validators import (
    ArchitectActions,
    BuilderActions,
    ManufacturerActions,
)
from services.websockets.permissions import is_player

from apps.business_game.consumers.connect import ConnectToGame


class BaseRoleConsumer(ConnectToGame, ABC):
    base_role_action_and_permissions = {
        "get_house_plan": [is_player],
        "build_house": [is_player],
        "get_resource_by_license": [is_player],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @send_data_to_coordinator
    @validate(validator=ArchitectActions)
    def action_get_house_plan(self):
        data = self.validated_data
        player = self.game.get_player(self.user.id)
        result, message = player.game_role.get_plan(data.method)
        if not result:
            notice = Notice.create_error_notice(message)
        else:
            notice = Notice.create_info_notice(message)
        self.send_to_channel(
            player.channel,
            player=player,
            notice=notice,
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @send_data_to_coordinator
    @validate(validator=BuilderActions)
    def action_build_house(self):
        data = self.validated_data
        player = self.game.get_player(self.user.id)
        result, message = player.game_role.get_house(data.method)
        if not result:
            notice = Notice.create_error_notice(message)
        else:
            notice = Notice.create_info_notice(message)
        self.send_to_channel(
            player.channel,
            player=player,
            notice=notice,
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @send_data_to_coordinator
    @validate(validator=ManufacturerActions)
    def action_get_resource_by_license(self):
        data = self.validated_data
        player = self.game.get_player(self.user.id)
        result, message = player.game_role.get_resource(data.method)
        if not result:
            notice = Notice.create_error_notice(message)
        else:
            notice = Notice.create_info_notice(message)
        self.send_to_channel(
            player.channel,
            player=player,
            notice=notice,
        )
