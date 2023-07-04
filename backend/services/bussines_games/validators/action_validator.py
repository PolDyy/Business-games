from pydantic import BaseModel, validator


class BaseAction(BaseModel):
    """Класс валидатор action."""

    action: str

    @validator("action")
    def correct_action_name(cls, value):
        """Метод проверки, есть ли action."""
        from apps.business_game.consumers import GameWebsocketAPI

        actions = [
            attribute
            for attribute in dir(GameWebsocketAPI)
            if attribute.startswith("action_")
        ]
        if value not in actions:
            raise ValueError("Неверный action")

        return value
