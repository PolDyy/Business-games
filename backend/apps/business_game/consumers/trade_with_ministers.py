from abc import ABC

from services.bussines_games.deocarators.decorators import game_status_check, validate
from services.bussines_games.notice import Notice
from services.bussines_games.save_game.save_game import save_game
from services.bussines_games.utils.game_utils import GameStates
from services.bussines_games.validators.data_validators import (
    TradeToEducationMinister,
    TradeToJKH,
    TradeToMVDData,
    TradeToSMI,
)
from services.websockets.interface import InterfaceMinisterConsumer
from services.websockets.permissions import is_player


class TradeResourcesMinistersConsumer(InterfaceMinisterConsumer, ABC):
    trade_with_ministers_action_and_permissions = {
        "send_trade_to_mvd": [is_player],
        "send_trade_to_jkh": [is_player],
        "send_trade_to_education_minister": [is_player],
        "send_trade_to_smi": [is_player],
    }

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=TradeToMVDData)
    def action_send_trade_to_mvd(self):
        data = self.validated_data

        player = self.game.get_player(self.user.id)
        minister_mvd = self.game.ministers.get_mvd()

        if minister_mvd == player:
            self.send_to_channel(
                minister_mvd.channel,
                notice=Notice.create_error_notice("Нельзя покупать у себя ресурсы!"),
            )
            return

        controlled_price = getattr(self.game.resources.controlled_prices, data.resource)
        if controlled_price < data.price_per_one:
            self.send_to_channel(
                player.channel,
                notice=Notice.create_error_notice(
                    "Указанная цена больше определенной министром экономики."
                ),
            )
            return

        result = player.game_role.send_offer_to_minister(
            minister=minister_mvd,
            resource=data.resource,
            quantity=data.quantity,
            price_per_one=data.price_per_one,
            trade_id=self.game.counter_ids.increase_counter(),
        )

        if not result[0]:
            self.send_to_channel(
                player.channel, notice=Notice.create_error_notice(result[1])
            )
            return

        self.send_messages_to_player_and_minister(
            player,
            minister_mvd,
            Notice.create_info_notice("Отправлено предложение обмена министру."),
            Notice.create_info_notice("Обмен отправлен на рассмотрение."),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=TradeToJKH)
    def action_send_trade_to_jkh(self):
        data = self.validated_data

        player = self.game.get_player(self.user.id)
        minister_jkh = self.game.ministers.get_minister_jkh()

        if data.resource_license == "building_license":
            building_licenses = player.game_role.resources.get_building_license()
            if len(building_licenses) > 0:
                self.send_to_channel(
                    player.channel,
                    notice=Notice.create_error_notice(
                        "Лицензия на строительство может быть только одна."
                    ),
                )
                return
        elif data.resource_license == "architecting_license":
            architecting_licenses = (
                player.game_role.resources.get_architecting_license()
            )
            if len(architecting_licenses) > 0:
                self.send_to_channel(
                    player.channel,
                    notice=Notice.create_error_notice(
                        "Лицензия на архитектурную деятельность может быть только одна."
                    ),
                )
                return

        result = player.game_role.send_offer_to_minister(
            minister=minister_jkh,
            resource=data.resource_license,
            quantity=1,
            price_per_one=data.price,
            trade_id=self.game.counter_ids.increase_counter(),
        )

        if not result[0]:
            self.send_to_channel(
                player.channel, notice=Notice.create_error_notice(result[1])
            )
            return

        self.send_messages_to_player_and_minister(
            player,
            minister_jkh,
            Notice.create_info_notice("Отправлено предложение обмена министру."),
            Notice.create_info_notice("Обмен отправлен на рассмотрение."),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=TradeToEducationMinister)
    def action_send_trade_to_education_minister(self):
        data = self.validated_data

        player = self.game.get_player(self.user.id)

        if player.game_role.get_diploma_state(data.diploma):
            self.send_to_channel(
                player.channel,
                notice=Notice.create_error_notice("У вас уже имеется диплом."),
            )
            return

        controlled_price = getattr(self.game.resources.controlled_prices, data.diploma)
        if controlled_price < data.price:
            self.send_to_channel(
                player.channel,
                notice=Notice.create_error_notice(
                    "Указанная цена больше определенной министром экономики."
                ),
            )
            return

        minister_education = self.game.ministers.get_minister_education()

        result = player.game_role.send_offer_to_minister(
            minister=minister_education,
            resource=data.diploma,
            quantity=1,
            price_per_one=data.price,
            trade_id=self.game.counter_ids.increase_counter(),
        )

        if not result[0]:
            self.send_to_channel(
                player.channel, notice=Notice.create_error_notice(result[1])
            )
            return

        self.send_messages_to_player_and_minister(
            player,
            minister_education,
            Notice.create_info_notice(
                "Отправлено предложение обмена министру образования."
            ),
            Notice.create_info_notice("Обмен отправлен на рассмотрение."),
        )

    @game_status_check(statuses=[GameStates.in_process])
    @save_game
    @validate(validator=TradeToSMI)
    def action_send_trade_to_smi(self):
        data = self.validated_data
        player = self.game.get_player(self.user.id)
        smi = self.game.get_player(data.smi_id)

        result = player.game_role.send_offer_to_minister(
            minister=smi,
            resource="advertising",
            quantity=1,
            price_per_one=data.price_per_one,
            trade_id=self.game.counter_ids.increase_counter(),
        )

        if not result[0]:
            self.send_to_channel(
                player.channel, notice=Notice.create_error_notice(result[1])
            )
            return

        self.send_messages_to_player_and_minister(
            player,
            smi,
            Notice.create_info_notice("Отправлено предложение СМИ."),
            Notice.create_info_notice("Обмен отправлен на рассмотрение."),
        )
