from services.bussines_games.roles.generic.base_role import BaseRole
from services.bussines_games.trades.credits import Credit


class CreditRole(BaseRole):
    def send_credit_offer(self, data, bank, credit_id):
        """Запрос кредита у банка."""
        credit = Credit(data.money, data.percents, bank, self.player, credit_id)
        try:
            credit.check_resources()
        except ValueError as ex:
            return False, str(ex)

        bank.game_role.credits.add_open_item(credit)
        self.player.game_role.credits.add_open_item(credit)
        return True, "Кредит успешно отправлен."

    def close_credit_offer(self, credit_id):
        """Закрытие кредита."""
        credit = self.credits.get_item_by_id(credit_id)

        if not credit:
            return False, "Данного кредита не существует."

        bank = credit.bank
        player = credit.player

        bank.game_role.credits.open_pop(credit_id)
        player.game_role.credits.open_pop(credit_id)

        bank.game_role.credits.add_closed_item(credit)
        player.game_role.credits.add_closed_item(credit)

        return bank, player

    def _check_money_for_pay(self, money):
        user_money = self.get_money()

        if user_money >= money:
            return True
        return False

    def make_pay(self, credit_id, money):

        credit = self.credits.get_item_by_id(credit_id)

        if not credit:
            return False, "Данного кредита не существует."

        if not self._check_money_for_pay(money):
            return False, "Недостаточно средств."

        bank = credit.bank
        player = credit.player

        if money >= credit.total_money:
            money = credit.total_money
            credit.change_status_to_close()

            bank.game_role.credits.accepted_pop(credit_id)
            player.game_role.credits.accepted_pop(credit_id)

            bank.game_role.credits.add_closed_item(credit)
            player.game_role.credits.add_closed_item(credit)

        banker_salary = int(money * (credit.percent / 100))
        bank_money = money - banker_salary

        credit.decrease_total_money(money)
        bank.game_role.increase_bank_money(bank_money)
        bank.game_role.increase_banker_salary(banker_salary)
        player.game_role.decrease_money(money)

        return bank, player
