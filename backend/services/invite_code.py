import random
import string

from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist

from services.cache.cache import RedisCacheMethods


class CodeMethods:
    """Класс методов для инвайт кода."""

    @staticmethod
    def get_coordinator_id_by_invite_code(invite_code: str):
        """Метод для получения ID координатора по инвайт коду."""
        is_invite_code_valid = RedisCacheMethods.get_invite_code(invite_code)
        if not is_invite_code_valid:
            try:
                coordinator = apps.get_model("users.Coordinator")
                coordinator.objects.get(invite_code=invite_code)
                RedisCacheMethods.set_invite_code(invite_code)
            except ObjectDoesNotExist:
                return None
        coordinator_id = int(invite_code.split("-")[0])
        return coordinator_id

    @staticmethod
    def get_game_id_by_code(game_code: str):
        """Метод для получения ID игры по коду."""
        is_invite_code_valid = RedisCacheMethods.get_game_code(game_code)
        if not is_invite_code_valid:
            try:
                game = apps.get_model("business_game.Game")
                game.objects.get(game_code=game_code)
                RedisCacheMethods.set_game_code(game_code)
            except ObjectDoesNotExist:
                return None
        game_id = int(game_code.split("-")[0])
        return game_id

    @staticmethod
    def generate_code(object_id: int) -> str:
        """Метод генерации инвайт кодаю.

        :param object_id:
        :return:
        """
        id_string = str(object_id)
        random_part = "".join([random.choice(string.ascii_letters) for _ in range(9)])
        code = "-".join((id_string, random_part))
        return code

    @classmethod
    def generate_new_invite_code(cls, coordinator_id, code):
        """."""
        if code:
            coordinator_id = int(code.split("-")[0])
            try:
                RedisCacheMethods.del_invite_code(code)
            except AttributeError:
                pass
        return cls.generate_code(coordinator_id)

    @classmethod
    def generate_new_game_code(cls, code):
        """."""
        game_id = int(code.split("-")[0])
        try:
            RedisCacheMethods.del_game_code(code)
        except AttributeError:
            pass
        return cls.generate_code(game_id)
