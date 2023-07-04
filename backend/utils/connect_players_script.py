from threading import Thread

import requests
import websocket


def on_message(ws, message):
    """."""
    pass


def on_error(ws, error):
    """."""
    pass


def on_close(ws, qwe, wwww):
    """."""
    pass


def on_open(ws):
    """."""
    pass


def login(index):
    """."""
    headers = {"Content-type": "application/json"}
    url = "http://localhost:8000/api/login/"
    login_data = {
        "user": {
            "email": f"player{index}@gmail.com",
            "password": "egor456852",
        }
    }
    response = requests.post(url, json=login_data, headers=headers)

    if response.status_code == 200:
        data = response.json()
        ACCESS_TOKENS.append(data.get("access_token"))
    else:
        data = response.json()


def ws_connect(token, room):
    """."""
    websocket.enableTrace(True)
    game_token = room
    access_token = token
    ws_url = f"localhost:8000/ws/game/{game_token}?token={access_token}"
    ws = websocket.WebSocketApp(
        f"ws://{ws_url}", on_message=on_message, on_error=on_error, on_close=on_close
    )
    ws.on_open = on_open
    ws.run_forever()


ACCESS_TOKENS = []


if __name__ == "__main__":
    """."""
    game_token = "16-xfamHytFa"
    login_threads = []
    for index in range(0, 16):
        if index == 0:
            index = ""
        if index == 14:
            continue
        thread = Thread(target=login, kwargs={"index": index})
        login_threads.append(thread)
        thread.start()

    for _ in login_threads:
        _.join()

    login_threads = []

    for token in ACCESS_TOKENS:
        thread = Thread(target=ws_connect, kwargs={"room": game_token, "token": token})
        thread.start()

    for _ in login_threads:
        _.join()
