from django.urls import path

from apps.business_game.consumers import GameWebsocketAPI

websocket_urlpatterns = [
    path("ws/game/<str:game_code>", GameWebsocketAPI.as_asgi(), name="ws_game"),
]
