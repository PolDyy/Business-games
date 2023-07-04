import { BaseActions } from "./baseAction"
import { urls } from "../../../urls"

class OnMessageActions {
	constructor(setters) {
		this.setters = setters
	}

	actionManager(websocketData) {
		switch (websocketData.action) {
			case "connect_to_game":
				this.setInitialGame(websocketData.data)
				break
			case "update_players":
				this.setters.setPlayersData(websocketData.data.players)
				break
			case "private_chat_send_message":
				this.setters.updateChat(websocketData.data)
				break
			case "game_chat_send_message":
				this.setters.updateChat(websocketData.data)
				break
			case "start_game":
				this.setters.setGameStatus(websocketData.data.game_status)
				break
			case "new_game_code":
				const code = websocketData.data.new_game_code
				this.setters.navigate(urls.businessGame + "/" + code)
				break
			case "update_lobby_players":
				this.setters.setLobbyPlayers(websocketData.data.players)
		}
	}

	setInitialGame(data) {
		switch (data.game_status) {
			case "lobby":
				this.setters.setGameStatus(data.game_status)
				this.setters.setTimeStart(data.time_start)
				this.setters.setLobbyPlayers(data.players)
				this.setters.setUserID(data.user_id)
				this.setters.setGameName(data.game_name)
				break
			case "in_process":
				this.setters.setGameStatus(data.game_status)
				this.setters.setTimeStart(data.time_start)
				this.setters.setPlayersData(data.players)
				this.setters.setUserID(data.user_id)
				this.setters.setGameName(data.game_name)
				break
		}
	}
}

class GameChangeActions extends BaseActions {
	endGame() {
		console.log("Игра окончена")
	}

	startGame() {
		this.sendActions("start_game")
	}

	changeYear() {
		this.sendActions("change_year")
	}

	updateCode() {
		this.sendActions("new_game_code")
	}
}

export class CoordinatorActions {
	constructor(ws, setters) {
		this.ws = ws
		this.onMessageActions = new OnMessageActions(setters)
		this.gameChangeActions = new GameChangeActions(ws)
	}
}
