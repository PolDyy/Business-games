from abc import ABC

from services.bussines_games.bussines_games import PlayerGame
from services.bussines_games.deocarators.decorators import (
    game_status_check,
    send_data_to_coordinator,
    validate,
)
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import save_game
from services.bussines_games.utils.game_utils import GameStates
from services.bussines_games.validators.data_validators import (
    AcceptOrCloseData,
    CreditCounterOffer,
    CreditData,
    MakePayCreditData,
    TakeMoneyFromBankData,
)
from services.websockets.interface import InterfaceCreditConsumer
from services.websockets.permissions import is_bank, is_player


class CreditConsumer(InterfaceCreditConsumer, ABC):
    credit_action_and_permissions = {
        "send_credit_offer": [is_player],
        "accept_credit_offer": [is_player, is_bank],
        "make_credit_pay": [is_player],
        "take_money_from_bank": [is_player, is_bank],
        "decline_credit_offer": [is_player],
        "counter_offer": [is_player, is_bank],
        "take_money_from_user": [is_player, is_bank],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @send_data_to_coordinator
    @validate(validator=MakePayCreditData)
    def action_take_money_from_user(self):
        data = self.validated_data
        bank = self.game.get_player(self.user.id)
        result = bank.take_money_from_user(data.item_id, data.money)

        if not result[0]:
            self.send_to_channel(
                self.send_to_channel(
                    bank.channel, notice=Notice.create_error_notice(result[1])
                )
            )
            return
        bank, player = result
        self.send_messages_to_player_and_bank(
            player,
            bank,
            Notice.create_info_notice("Банк изъял ваши деньги."),
            Notice.create_info_notice("Деньги успешно получены."),
        )
        self.update_bank_and_user_data(bank, player)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=CreditCounterOffer)
    def action_counter_offer(self):
        data = self.validated_data
        bank = self.game.get_player(self.user.id)
        offer = bank.game_role.credits.get_item_by_id(data.item_id)
        player = offer.player
        result = bank.game_role.current_offer(offer, data.percent)

        if not result[0]:
            self.send_to_channel(
                bank.channel, notice=Notice.create_error_notice(result[1])
            )
            return

        self.send_messages_to_player_and_bank(
            player,
            bank,
            Notice.create_info_notice("Получено встречное предложение от банка."),
            Notice.create_info_notice("Встречное предложение отправлено."),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=AcceptOrCloseData)
    def action_decline_credit_offer(self):
        data = self.validated_data
        player_or_bank = self.game.get_player(self.user.id)

        result = player_or_bank.game_role.close_credit_offer(data.item_id)

        if not result[0]:
            self.send_to_channel(
                player_or_bank.channel,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        bank, player = result

        self.send_messages_to_player_and_bank(
            player,
            bank,
            Notice.create_info_notice("Предложение кредита было отменено."),
            Notice.create_info_notice("Предложение кредита было отменено."),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=CreditData)
    def action_send_credit_offer(self):
        data: CreditData = self.validated_data

        current_user: PlayerGame = self.game.get_player(self.user.id)
        bank: PlayerGame = self.game.get_player(data.bank_id)

        result = current_user.game_role.send_credit_offer(
            data=data,
            bank=bank,
            credit_id=self.game.counter_ids.increase_counter(),
        )

        if not result[0]:
            self.send_to_channel(
                self.channel_name,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        self.send_messages_to_player_and_bank(
            current_user,
            bank,
            Notice.create_info_notice(result[1]),
            Notice.create_info_notice("У вас новый запрос на кредит."),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @send_data_to_coordinator
    @validate(validator=AcceptOrCloseData)
    def action_accept_credit_offer(self):
        data: AcceptOrCloseData = self.validated_data

        bank: PlayerGame = self.game.get_player(self.user.id)

        result = bank.game_role.accept_credit_offer(data.item_id)

        if not result[0]:
            self.send_to_channel(
                self.channel_name,
                notice=Notice.create_error_notice(result[1]),
            )
            return
        bank, player = result

        self.send_messages_to_player_and_bank(
            player,
            bank,
            Notice.create_info_notice("Кредит одобрен."),
            Notice.create_info_notice("Кредит одобрен."),
        )
        self.update_bank_and_user_data(bank, player)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @send_data_to_coordinator
    @validate(validator=MakePayCreditData)
    def action_make_credit_pay(self):
        data: MakePayCreditData = self.validated_data

        current_user: PlayerGame = self.game.get_player(self.user.id)

        result = current_user.game_role.make_pay(data.item_id, data.money)

        if not result:
            self.send_to_channel(
                self.channel_name,
                notice=Notice.create_error_notice(
                    "Не достаточно ресурсов для платежа."
                ),
            )
            return

        bank, player = result

        self.send_messages_to_player_and_bank(
            player,
            bank,
            Notice.create_info_notice("Платеж успешно совершен."),
            Notice.create_info_notice("Поступил платеж по кредиту."),
        )
        self.update_bank_and_user_data(bank, player)

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @send_data_to_coordinator
    @validate(validator=TakeMoneyFromBankData)
    def action_take_money_from_bank(self):
        data: TakeMoneyFromBankData = self.validated_data

        bank = self.game.get_player(self.user.id)

        result = bank.game_role.take_money(data.money)

        if not result[0]:
            self.send_to_channel(
                self.channel_name,
                notice=Notice.create_error_notice(result[1]),
            )
            return

        self.send_to_channel(
            bank.channel,
            player=bank,
            notice=Notice.create_info_notice("Средства успешно зачислены."),
        )
        self.update_bank_and_user_data(bank, bank)
