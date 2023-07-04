from services.bussines_games.trades.container import ItemStatus


class Credit:
    """."""

    def __init__(self, money, percent, bank, player, credit_id):
        self.total_money = money * (1 + percent / 100)
        self.money = money
        self.percent_money = money * (percent / 100)
        self.percent = percent
        self.bank = bank
        self.player = player
        self.status = ItemStatus.open
        self.item_id = credit_id

    def check_resources(self):
        bank_money = self.bank.game_role.get_bank_money()

        if self.percent > self.player.game.resources.get_credit_percents():
            raise ValueError("Превышен процент по кредиту.")

        if bank_money <= self.money:
            raise ValueError("У банка не достаточно денег.")
        return self

    def decrease_total_money(self, money):
        self.total_money -= money
        return self.total_money

    def change_status_to_accept(self):
        self.status = ItemStatus.accepted

    def change_status_to_close(self):
        self.status = ItemStatus.close

    def increase_total_money(self):
        self.total_money = int(self.total_money * (1 + self.percent) / 100)

    def to_json(self):
        """."""
        return {
            "bank": self.bank.name,
            "player": self.player.name,
            "money": self.total_money,
            "percent": self.percent,
            "status": self.status,
        }
