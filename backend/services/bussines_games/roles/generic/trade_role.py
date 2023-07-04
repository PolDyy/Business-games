from abc import ABC

from services.bussines_games.roles.generic.base_role import BaseRole
from services.bussines_games.trades.trades import Trade


class TradeRole(BaseRole, ABC):
    def send_offer_to_players(
        self, seller, resource, quantity, price_per_one, trade_id
    ):
        """Метод отправки обмена между игроками."""
        try:
            trade = Trade(
                buyer=self.player,
                seller=seller,
                resource=resource,
                quantity=quantity,
                price_per_one=price_per_one,
                trade_id=trade_id,
            ).check_resources()
        except ValueError as ex:
            return False, str(ex)

        self.trades.add_open_item(trade)
        seller.game_role.trades.add_open_item(trade)
        return (True,)

    def send_offer_to_minister(
        self, minister, resource, quantity, price_per_one, trade_id
    ):
        """Метод отправки обмена между игроками."""
        try:
            trade = Trade(
                buyer=self.player,
                seller=minister,
                resource=resource,
                quantity=quantity,
                price_per_one=price_per_one,
                trade_id=trade_id,
            ).check_resources_minister_trade()
        except ValueError as ex:
            return False, str(ex)

        self.trades_with_ministers.add_open_item(trade)
        minister.game_role.trades_with_ministers.add_open_item(trade)
        return (True,)

    def accept_offer(self, trade_id):
        """Метод принятия обмена."""
        trade = self.trades.get_item_by_id(trade_id)

        if not trade:
            return False, "Данного обмена не существует."

        try:
            trade.check_resources()
        except ValueError as ex:
            return False, str(ex)

        buyer = trade.buyer
        seller = trade.seller

        money_with_tax = trade.calculate_money_with_tax()
        money = trade.calculate_money()
        tax = money_with_tax - money

        self.game.resources.pay_tax(tax)

        buyer.game_role.decrease_money(money_with_tax)
        seller.game_role.increase_money(money)

        buyer.game_role.increase_resource_by_name(trade.resource, trade.quantity)
        seller.game_role.decrease_resource_by_name(trade.resource, trade.quantity)

        buyer.game_role.trades.open_pop(trade.item_id)
        seller.game_role.trades.open_pop(trade.item_id)

        buyer.game_role.trades.add_accepted_item(trade)
        seller.game_role.trades.add_accepted_item(trade)

        return seller, buyer

    def close_offer(self, trade_id):
        """Метод закрытия обмена."""
        trade = self.trades.open_pop(trade_id)

        if not trade:
            return False, "Данного обмена не существует."

        buyer = trade.buyer
        seller = trade.seller

        buyer.game_role.trades.add_closed_item(trade)
        seller.game_role.trades.add_closed_item(trade)

        return seller, buyer
