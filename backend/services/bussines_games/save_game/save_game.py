import logging
import os
import pickle
from pathlib import Path

logger = logging.getLogger()


class GameSaver:
    """Класс сохранения объектов игры."""

    save_dir = Path(__file__).parent.parent / "saves"

    @classmethod
    def save_to_file(cls, game):
        """Загрузка игры в файл."""
        game_dir = cls.save_dir / f"game_{game.game_id}"
        game_dir.mkdir(parents=True, exist_ok=True)
        try:
            with open((game_dir / "game.pkl"), "rb") as file:
                reserve_copy = pickle.load(file)
                cls._save_reserve_copy(game_dir, reserve_copy)
        except (EOFError, FileNotFoundError):
            pass

        with open(os.path.join(game_dir, "game.pkl"), "wb") as file:
            pickle.dump(game, file)

    @staticmethod
    def _save_reserve_copy(dir_path, data):
        """Сохранение резервной копии файла."""
        try:
            with open((dir_path / "reserve_game.pkl"), "wb") as file:
                pickle.dump(data, file)
        except EOFError:
            pass

    @classmethod
    def load_game(cls, game_id):
        """Метод загрузки данных игры из файла."""
        file_path = cls.save_dir / f"game_{game_id}" / "game.pkl"
        try:
            with open(file_path, "rb") as file:
                data = pickle.load(file)
            return data
        except (EOFError, IOError):
            return False

    @classmethod
    def load_reserve_file(cls, game_id):
        """Метод загрузки данных игры из резервного файла."""
        file_path = cls.save_dir / f"game_{game_id}" / "reserve_game.pkl"

        try:
            with open(file_path, "rb") as file:
                data = pickle.load(file)
            return data
        except (EOFError, IOError):
            return False


def save_game(method):
    """Функция - декоратор для записи объекта в файл."""

    def wrapped(*args, **kwargs):
        """Функция обертка вызывает метод сохранения игры."""
        response = method(*args, **kwargs)
        game = args[0].game
        if game:
            GameSaver().save_to_file(game)
        return response

    return wrapped
