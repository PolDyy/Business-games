from services.bussines_games.bussines_games import PlayerGame
from services.bussines_games.notice import Notice
from services.bussines_games.roles.roles import (
    Bank,
    MinisterEconomy,
    MinisterEducation,
    MinisterJKH,
    MinisterMVD,
    Ministers,
    President,
    RoleSMI,
)
from services.bussines_games.save_game.save_game import save_game
from services.websockets.permissions import access_true, is_player

from apps.business_game.consumers.base_role import BaseRoleConsumer
from apps.business_game.consumers.chat import ChatConsumer
from apps.business_game.consumers.connect import DisconnectFromGame
from apps.business_game.consumers.coordinator import CoordinatorConsumer
from apps.business_game.consumers.credit import CreditConsumer
from apps.business_game.consumers.economy_minister import EconomyMinisterConsumer
from apps.business_game.consumers.minister_education import EducationsMinisterConsumer
from apps.business_game.consumers.minister_mvd import MVDConsumer
from apps.business_game.consumers.minister_smi import SMIConsumer
from apps.business_game.consumers.ministerJKH import MinisterJKHConsumer
from apps.business_game.consumers.president_minister import PresidentConsumer
from apps.business_game.consumers.trade import TradeConsumer
from apps.business_game.consumers.trade_with_ministers import (
    TradeResourcesMinistersConsumer,
)


class GameWebsocketAPI(
    MinisterJKHConsumer,
    EconomyMinisterConsumer,
    PresidentConsumer,
    TradeConsumer,
    ChatConsumer,
    CreditConsumer,
    TradeResourcesMinistersConsumer,
    MVDConsumer,
    EducationsMinisterConsumer,
    BaseRoleConsumer,
    CoordinatorConsumer,
    SMIConsumer,
    DisconnectFromGame,
):
    """Вебсокет для игры."""

    action_and_permissions = {
        "change_role": [is_player],
        "add_ministers": [is_player],
        "pay_paycheck": [is_player],
        "set_roles": [is_player],
        "test": [access_true],
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @save_game
    def action_change_role(self):
        current_user: PlayerGame = self.game.get_player(self.user.id)
        current_user.game_role = MinisterEducation(
            self.game, current_user, game_role_name="minister_education"
        )
        self.game.resources.cash_in_wallet(500)
        # current_user.game_role.increase_bank_money(10000000)
        self.game.ministers = Ministers(minister_education=current_user)
        notice = Notice.create_info_notice("Роль успешно изменена.")
        self.send_to_channel(self.channel_name, notice=notice)

    @save_game
    def action_add_ministers(self):
        president = self.game.get_player(10)
        president.game_role = President(self.game, president)
        jkh = self.game.get_player(11)
        jkh.game_role = MinisterJKH(self.game, jkh)
        mvd = self.game.get_player(12)
        mvd.game_role = MinisterMVD(self.game, mvd)
        smi = self.game.get_player(13)
        smi.game_role = RoleSMI(self.game, smi)
        education = self.game.get_player(14)
        education.game_role = MinisterEducation(self.game, education)
        economy = self.game.get_player(15)
        economy.game_role = MinisterEconomy(self.game, economy)
        bank = self.game.get_player(16)
        bank.game_role = Bank(self.game, bank)
        player = self.game.get_player(18)
        self.game.ministers = Ministers(
            president=president,
            minister_economy=economy,
            minister_education=education,
            smi_1=smi,
            mvd=mvd,
            minister_jkh=jkh,
        )
        bank.game_role.increase_bank_money(10000000)
        self.game.resources.cash_in_wallet(500)
        player.game_role.resources.infinity()
        notice = Notice.create_info_notice("Роль успешно изменена.")
        self.send_to_channel(self.channel_name, notice=notice)

    @save_game
    def action_set_roles(self):
        president = self.game.get_player(10)
        president.game_role = President(self.game, president)
        jkh = self.game.get_player(11)
        jkh.game_role = MinisterJKH(self.game, jkh)
        mvd = self.game.get_player(12)
        mvd.game_role = MinisterMVD(self.game, mvd)
        smi = self.game.get_player(13)
        smi.game_role = RoleSMI(self.game, smi)
        education = self.game.get_player(14)
        education.game_role = MinisterEducation(self.game, education)
        economy = self.game.get_player(15)
        economy.game_role = MinisterEconomy(self.game, economy)

    @save_game
    def action_pay_paycheck(self):
        self.game.resources.pay_paycheck(self.game.ministers.get_all_ministers())

    @save_game
    def action_test(self):
        self.game.set_game_status_lobby()
        pass
