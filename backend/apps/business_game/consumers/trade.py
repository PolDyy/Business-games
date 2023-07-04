from abc import ABC

from services.bussines_games.bussines_games import PlayerGame
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
    TradeData,
)
from services.websockets.interface import InterfaceTradeConsumer
from services.websockets.permissions import is_player


class TradeConsumer(InterfaceTradeConsumer, ABC):
    trade_action_and_permissions = {
        "create_trade": [is_player],
        "accept_trade": [is_player],
        "close_trade": [is_player],
        "infinity_resources": [is_player],
    }

    @save_game
    @send_data_to_coordinator
    def action_infinity_resources(self):
        current_player = self.game.get_player(self.user.id)
        current_player.game_role.resources.infinity()
        notice = Notice.create_info_notice("Ресурсы успешно зачислены.")
        self.send_to_channel(
            self.channel_name,
            player=current_player,
            notice=notice,
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=TradeData)
    def action_create_trade(self):
        """."""
        data = self.validated_data
        buyer: PlayerGame = self.game.get_player(self.user.id)
        seller: PlayerGame = self.game.get_player(data.seller_id)

        result = buyer.game_role.send_offer_to_players(
            seller=seller,
            resource=data.resource,
            quantity=data.quantity,
            price_per_one=data.price_per_one,
            trade_id=self.game.counter_ids.increase_counter(),
        )

        if not result[0]:
            self.send_to_channel(
                buyer.channel, notice=Notice.create_error_notice(result[1])
            )
            return

        self.send_messages_to_seller_and_buyer(
            seller,
            buyer,
            Notice.create_info_notice("Новое предложение обмена."),
            Notice.create_info_notice("Обмен отправлен на рассмотрение."),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @update_treasury
    @send_data_to_coordinator
    @validate(validator=AcceptOrCloseData)
    def action_accept_trade(self):
        data: AcceptOrCloseData = self.validated_data

        current_player: PlayerGame = self.game.get_player(self.user.id)

        result = current_player.game_role.accept_offer(data.item_id)

        if not result[0]:
            self.send_to_channel(
                current_player.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        seller, buyer = result

        self.send_messages_to_seller_and_buyer(
            seller,
            buyer,
            Notice.create_info_notice("Обмен успешно совершен."),
            Notice.create_info_notice("Обмен успешно совершен."),
        )
        # self.update_seller_and_buyer_data(seller, buyer)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=AcceptOrCloseData)
    def action_close_trade(self):

        data: AcceptOrCloseData = self.validated_data

        current_player: PlayerGame = self.game.get_player(self.user.id)

        result = current_player.game_role.close_offer(data.item_id)

        if not result[0]:
            self.send_to_channel(
                current_player.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        seller, buyer = result

        self.send_messages_to_seller_and_buyer(
            seller,
            buyer,
            Notice.create_info_notice("Обмен отменен."),
            Notice.create_info_notice("Обмен отменен."),
        )
