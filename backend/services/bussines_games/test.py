import pickle
from pathlib import Path

save_dir = Path(__file__).parent / "saves" / 'game_89'

with open((save_dir / 'game.pkl'), "rb") as test_file:
    data = pickle.load(test_file)
print(data.resources.treasury.wallet)
print(data.resources.salary)


for id, player in data.players.items():
    print(f"_________________________\n"
          f"{player} {id}\n\n"
          f"{player.game_role} \n\n"
          f"{player.game_role.resources.trade_resources } \n\n"
          f"{player.game_role.resources.non_trade_resources } \n\n"
          f"{player.game_role.trades_with_ministers.items['open']} \n\n"
          f"{player.game_role.trades} \n\n")


