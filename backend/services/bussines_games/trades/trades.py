class TradeStatus:
    """."""

    open = "open"
    close = "close"
    accepted = "accepted"


class Trade:
    """."""

    def __init__(self, buyer, seller, resource, quantity, price_per_one, trade_id):
        """."""
        self.seller = seller
        self.buyer = buyer
        self.resource = resource
        self.quantity = quantity
        self.price_per_one = price_per_one
        self.status = TradeStatus.open
        self.item_id = trade_id

    def check_resources(self):
        """."""
        buyer_money = self.buyer.game_role.get_money()
        money_for_pay = self.calculate_money_with_tax()

        if not buyer_money >= money_for_pay:
            raise ValueError("Нехватает денег.")
        sellers_resource = self.seller.game_role.get_trade_resource_by_name(
            self.resource
        )

        if not sellers_resource >= self.quantity:
            raise ValueError("Недостаточно ресурсов.")

        return self

    def check_resources_minister_trade(self):

        buyer_money = self.buyer.game_role.get_money()
        money_for_pay = self.calculate_money_with_tax()

        if not buyer_money >= money_for_pay:
            raise ValueError("Нехватает денег.")

        return self

    def calculate_money(self):
        return self.price_per_one * self.quantity

    def calculate_money_with_tax(self):
        game = self.buyer.game
        return self.calculate_money() * game.resources.get_tax_percent()

    def to_json(self):
        """."""
        return {
            "seller": self.seller.name,
            "buyer": self.buyer.name,
            "resource": self.resource,
            "quantity": self.quantity,
            "price_per_one": self.price_per_one,
            "status": self.status,
        }
