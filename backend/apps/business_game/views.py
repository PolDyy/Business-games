from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from services.bussines_games.bussines_games import GamesContainer
from services.permissions import IsCoordinator

from apps.business_game.models import Game, GameAttributes
from apps.business_game.serializers import GameSerializer


class GameViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """Класс отображения для Игр."""

    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @action(detail=False, methods=["post"])
    def create_game_and_set_attributes(self, request):
        """Метод создания игры и атрибутов к ней."""
        game_name = request.data.get("game_name")
        time_start = request.data.get("time_start")
        required_attributes = request.data.get("required_attributes")

        attributes = []
        for key, value in required_attributes.items():
            if value:
                attributes.append(int(key))

        game = Game.objects.create_game(
            name=game_name,
            coordinator_id=request.user.id,
            time_start=time_start,
        )
        game = Game.objects.get(id=game.id)
        GamesContainer().create_game(game.id, game_name, request.user, game.time_start)
        GameAttributes.objects.set_attributes(
            game_id=game.id, required_attributes=attributes
        )
        return Response(
            {"game_code": game.game_code},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["game"])
    def get_games_for_coordinator(self, request):
        # games = Game.objects.filter(coordinator_id=request.user.id)
        return Response(200)

    def get_permissions(self):
        """Метод проверяющий права доступа."""
        actions = {
            "list": [IsAdminUser],
            "create_game_and_set_attributes": [IsAuthenticated, IsCoordinator],
        }
        permission_classes = actions[self.action]

        return [permission() for permission in permission_classes]
