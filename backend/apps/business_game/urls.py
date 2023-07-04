from django.urls import path

from apps.business_game.views import GameViewSet

urlpatterns = [
    path(
        "api/game/start",
        GameViewSet.as_view(
            {
                "post": "create_game_and_set_attributes",
            }
        ),
    ),
]
