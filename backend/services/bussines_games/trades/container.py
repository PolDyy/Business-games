from services.bussines_games.trades.trades import TradeStatus


class ItemStatus:
    """."""

    open = "open"
    close = "close"
    accepted = "accepted"


class Container:
    def __init__(self):
        self.items = {
            ItemStatus.open: {},
            ItemStatus.close: {},
            ItemStatus.accepted: {},
        }

    def close_all_open_items(self):
        try:
            open_trades = self.items.pop(ItemStatus.open)
        except KeyError:
            open_trades = {}
        self.items[ItemStatus.open] = {}
        try:
            self.items[ItemStatus.close].update(open_trades)
        except KeyError:
            self.items[ItemStatus.close] = {**open_trades}

    def get_item_by_id(self, item_id):

        item = self.items[ItemStatus.open].get(item_id)

        if item:
            return item

        item = self.items[ItemStatus.accepted].get(item_id)

        if item:
            return item

        item = self.items[ItemStatus.open].get(item_id)

        if item:
            return item

    def open_pop(self, item_id):
        return self.items[ItemStatus.open].pop(item_id, None)

    def accepted_pop(self, item_id):
        return self.items[ItemStatus.accepted].pop(item_id, None)

    def get_accepted(self):
        return self.items[ItemStatus.accepted]

    def close_pop(self, item_id):
        return self.items[ItemStatus.close].pop(item_id, None)

    def add_open_item(self, item):
        self.items[ItemStatus.open][item.item_id] = item
        return item

    def add_accepted_item(self, item):
        self.items[ItemStatus.accepted][item.item_id] = item
        item.status = TradeStatus.accepted
        return item

    def add_closed_item(self, item):
        self.items[ItemStatus.close][item.item_id] = item
        item.status = TradeStatus.close
        return item

    def get_all_items(self):
        open_items = self.items.get(ItemStatus.open, {})
        closed_items = self.items.get(ItemStatus.close, {})
        accepted_items = self.items.get(ItemStatus.accepted, {})

        open_items = self._to_json_items(open_items)
        closed_items = self._to_json_items(closed_items)
        accepted_items = self._to_json_items(accepted_items)

        return {
            ItemStatus.open: open_items,
            ItemStatus.close: closed_items,
            ItemStatus.accepted: accepted_items,
        }

    def incoming_trades(self, user):
        trades = self.items
        try:
            trades["incoming"] = {
                trade_id: {**trade}
                for trade_id, trade in trades["open"].items()
                if trade["seller"] == user.name
            }
            trades["outgoing"] = {
                trade_id: {**trade}
                for trade_id, trade in trades["open"].items()
                if trade["buyer"] == user.name
            }
        except KeyError:
            trades["incoming"] = {}
            trades["outgoing"] = {}

        try:
            closed = {
                trade_id: {**trade, "outgoing": True}
                if trade["buyer"] == user.name
                else {**trade, "outgoing": False}
                for trade_id, trade in trades["close"].items()
            }
        except KeyError:
            closed = {}

        try:
            accepted = {
                trade_id: {**trade, "outgoing": True}
                if trade["buyer"] == user.name
                else {**trade, "outgoing": False}
                for trade_id, trade in trades["accepted"].items()
            }
        except KeyError:
            accepted = {}

        trades["closed"] = {**closed, **accepted}
        try:
            trades.pop("open")
            trades.pop("close")
            trades.pop("accepted")
        except KeyError:
            pass

        return trades

    @classmethod
    def _to_json_items(cls, items: dict):
        """."""
        return {str(key): value.to_json() for key, value in items.items()}
