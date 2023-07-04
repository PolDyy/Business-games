from apps.business_game.consumers.connect import ConnectToGame


class InterfaceConsumer(ConnectToGame):
    def _send_messages_to_players(
        self,
        player_1,
        player_2,
        player_1_notice,
        player_2_notice,
        player_1_data,
        player_2_data,
    ):
        """Метод отправки сообщений игрокам."""
        self.send_to_channel(
            player_1.channel,
            player=player_1,
            data=player_1_data,
            notice=player_1_notice,
        )
        self.send_to_channel(
            player_2.channel,
            player=player_2,
            data=player_2_data,
            notice=player_2_notice,
        )

    def _update_player_resources(self, player, action, data):
        self.send_to_channel(player.channel, player=player, action=action, data=data)


class InterfaceMinisterConsumer(InterfaceConsumer):
    """Интерфейса для министров."""

    def send_messages_to_player_and_minister(
        self, player, minister, player_notice, minister_notice
    ):
        """Метод отправки сообщений игроку и минимтру."""
        player_data = self.get_in_process_data(player.player_id)["data"]
        minister_data = self.get_in_process_data(player.player_id)["data"]
        self._send_messages_to_players(
            player, minister, player_notice, minister_notice, player_data, minister_data
        )


class InterfaceTradeConsumer(InterfaceConsumer):
    """Интерфейса для трейдов."""

    def send_messages_to_seller_and_buyer(
        self, seller, buyer, seller_notice, buyer_notice
    ):
        """Метод отправки сообщений игроку и минимтру."""
        seller_data = self.get_in_process_data(seller.player_id)["data"]
        buyer_data = self.get_in_process_data(buyer.player_id)["data"]
        self._send_messages_to_players(
            seller, buyer, seller_notice, buyer_notice, seller_data, buyer_data
        )


class InterfaceCreditConsumer(InterfaceConsumer):
    """Интерфейса для кредитов."""

    def send_messages_to_player_and_bank(
        self, player, bank, player_notice, bank_notice
    ):
        """Метод отправки сообщений игроку и банку."""
        player_data = self.get_in_process_data(player.player_id)["data"]
        bank_data = self.get_in_process_data(bank.player_id)["data"]
        self._send_messages_to_players(
            player, bank, player_notice, bank_notice, player_data, bank_data
        )

    def update_bank_and_user_data(self, bank, player):
        """."""
        player_data = self.get_in_process_data(player.player_id)["data"]
        bank_data = self.get_in_process_data(bank.player_id)["data"]
        self._update_player_resources(bank, "update_bank_data", bank_data)
        self._update_player_resources(player, "update_resources", player_data)
