from abc import ABC

from services.bussines_games.resources.resources import ResourcesPlayer
from services.bussines_games.trades.container import Container


class BaseRole(ABC):
    """Класс базовый для роли."""

    def __init__(
        self,
        game,
        player,
        game_role_name="BaseRole",
        description="Text",
        alias="base_role",
    ):
        self.trades = Container()
        self.trades_with_ministers = Container()
        self.credits = Container()
        self.resources = ResourcesPlayer()

        self.game = game
        self.player = player

        self.game_role_name: str = game_role_name
        self.description: str = description
        self.alias: str = alias

    def on_change_year(self):
        self.trades.close_all_open_items()
        self.credits.close_all_open_items()
        self.trades_with_ministers.close_all_open_items()
        self.resources.on_change_year()

        accepted_credits = self.credits.get_accepted().values()
        for credit in accepted_credits:
            credit.increase_total_money()

    def get_money(self):
        return self.resources.trade_resources.money

    def increase_money(self, money):
        self.resources.trade_resources.money += money
        return self.resources.trade_resources.money

    def decrease_money(self, money):
        self.resources.trade_resources.money -= money
        return self.resources.trade_resources.money

    def get_trade_resource_by_name(self, name):
        tradable_resources = self.resources.trade_resources
        return getattr(tradable_resources, name)

    def increase_resource_by_name(self, name, value):
        tradable_resources = self.resources.trade_resources
        new_value = getattr(tradable_resources, name) + value
        setattr(tradable_resources, name, new_value)

    def decrease_resource_by_name(self, name, value):
        tradable_resources = self.resources.trade_resources
        new_value = getattr(tradable_resources, name) - value
        setattr(tradable_resources, name, new_value)

    def set_diploma_state(self, diploma, state):
        non_tradable_resources = self.resources.non_trade_resources
        setattr(non_tradable_resources, diploma, state)

    def get_diploma_state(self, diploma):
        non_tradable_resources = self.resources.non_trade_resources
        return getattr(non_tradable_resources, diploma)


class Manufacturer(BaseRole):
    def get_resource(self, method_name):
        licence = "_".join((method_name, "licenses"))
        return self.get_resource_by_licence(licence, method_name)

    def get_resource_by_licence(self, resource_licence, resource):

        licenses = getattr(self.resources.non_trade_resources, resource_licence)
        licenses_amount = len(licenses)
        if licenses_amount == 0:
            return False, "У вас нет необходимой лицензии"

        accessibility = getattr(self.resources.is_available, resource)
        if not accessibility:
            return False, "В этом году вы уже получали данный ресурс"
        setattr(self.resources.is_available, resource, False)

        quantity_per_one_license = licenses[0].quantity
        set_resource = (
            getattr(self.resources.trade_resources, resource)
            + licenses_amount * quantity_per_one_license
        )
        setattr(self.resources.trade_resources, resource, set_resource)
        return True, "Ресурсы получены!"


class Architect(BaseRole):
    def get_plan(self, method_name):
        architect_methods = {
            "small_house_plan": self.get_small_house_plan,
            "big_house_plan": self.get_big_house_plan,
        }
        return architect_methods[method_name]()

    def _is_architect(self):
        diploma = self.resources.non_trade_resources.architect_diploma
        architect_license = self.resources.non_trade_resources.architecting_licenses

        if diploma and architect_license:
            return True, None
        elif not diploma:
            return False, "Необходимо получить диплом архитектора"
        else:
            return False, "Необходимо получить лицензию на архитектурную деятельность"

    def get_small_house_plan(self):
        result, message = self._is_architect()
        if not result:
            return False, message
        self.resources.trade_resources.plan_of_small_house += 1
        return True, "Получен план малого дома"

    def get_big_house_plan(self):
        result, message = self._is_architect()
        if not result:
            return False, message
        self.resources.trade_resources.plan_of_big_house += 1
        return True, "Получен план большого дома"


class Builder(BaseRole):
    def get_house(self, method_name):
        builder_methods = {
            "small_house": self.build_small_house,
            "big_house": self.build_big_house,
        }
        return builder_methods[method_name]()

    def _is_builder(self):
        diploma = self.resources.non_trade_resources.building_diploma
        builder_license = self.resources.non_trade_resources.building_licenses

        if diploma and builder_license:
            return True, None
        elif not diploma:
            return False, "Необходимо получить диплом строителя"
        else:
            return False, "Необходимо получить лицензию на строительство"

    def build_small_house(self):

        result, message = self._is_builder()
        if not result:
            return False, message

        result, message = self.resources.build_small_house()

        return result, message

    def build_big_house(self):

        result, message = self._is_builder()
        if not result:
            return False, message

        result, message = self.resources.build_big_house()

        return result, message
