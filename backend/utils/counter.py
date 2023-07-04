class Counter:
    """Класс счетчик."""

    def __init__(self):
        """Инициализация."""
        self._counter = 0

    def increase_counter(self):
        """Метод для увеличения счетчика."""
        self._counter += 1
        return self._counter

    def get_counter(self):
        """Метод получения счетчика."""
        return self._counter
