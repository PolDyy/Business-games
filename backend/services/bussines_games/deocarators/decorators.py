from services.bussines_games.notice import Notice
from services.bussines_games.roles.roles import President, RoleSMI
from services.bussines_games.utils.game_utils import GameStates


def validate(validator):
    """Декоратор-валидатор."""

    def decorator(func):
        def wrapped(*args, **kwargs):
            self = args[0]
            validated_data = self._validate(validator, self.data)
            if not validated_data:
                return None
            self.validated_data = validated_data
            result = func(self, **kwargs)

            return result

        return wrapped

    return decorator


def game_status_check(statuses=None, special_status=None):
    """Декоратор-валидатор."""

    def decorator(func):
        def wrapped(*args, **kwargs):
            self = args[0]
            game_status = self.game.game_status

            possible_games_roles = {
                GameStates.smi_1_time: RoleSMI,
                GameStates.smi_2_time: RoleSMI,
                GameStates.president_time: President,
            }
            possible_role = possible_games_roles.get(game_status)

            if self.game.is_coordinator(self.user.id):
                result = func(self, **kwargs)

                return result

            player_role = self.game.get_player(self.user.id).game_role

            if game_status in statuses:

                result = func(self, **kwargs)

                return result
            elif (
                game_status
                and game_status in special_status
                and type(player_role) is possible_role
            ):
                result = func(self, **kwargs)

                return result
            else:
                self.send_to_channel(
                    self.channel_name,
                    notice=Notice.create_error_notice(
                        "Данное действие сейчас не доступно"
                    ),
                )

        return wrapped

    return decorator


def send_data_to_coordinator(func):
    """Отправляет координатору ресурсы игроков."""

    def wrapped(*args, **kwargs):
        self = args[0]
        result = func(self, **kwargs)
        coordinator_channel = self.game.coordinator.channel
        data_to_send = [
            player.player_data_for_coordinator()
            for player in self.game.players.values()
        ]
        self.send_to_channel(
            coordinator_channel, action="update_players", data=data_to_send
        )
        return result

    return wrapped


def update_treasury(func):
    """Декоратор для обновления казны у президента."""

    def wrapped(*args, **kwargs):
        self = args[0]
        result = func(self, **kwargs)
        president_channel = self.game.ministers.get_president().channel
        data_to_send = {"treasury_wallet": self.game.resources.treasury.wallet}
        self.send_to_channel(
            president_channel, action="update_treasury", data=data_to_send
        )
        return result

    return wrapped


def update_lobby_players(func):
    """Декоратор для обновления игроков у координатора."""

    def wrapped(*args, **kwargs):
        self = args[0]
        result = func(self, **kwargs)
        if self.game is None:
            return result
        coordinator_id = self.game.coordinator.coordinator_id
        if not self.game.is_coordinator(self.user.id):
            self.send_to_channel(
                self.game.coordinator.channel,
                action="update_lobby_players",
                data={"players": self.game.get_players_name_and_id(coordinator_id)},
            )
        return result

    return wrapped
