import React from "react"
import "./styles/userLobby.scss"
import UserLobbyMessage from "./modules/userLobbyMessage"
import Layout from "../../../../../components/layouts/layout"
import StartGameField from "../coordinatorLobby/modules/startGameField"

function PlayerLobby({ timeStart }) {
	return (
		<div className="user_lobby">
			<div className="user_lobby__start_game">
				<StartGameField date={timeStart.date} time={timeStart.time} />
			</div>
			<div className="user_lobby__lobby_message_container">
				<UserLobbyMessage />
			</div>
		</div>
	)
}

export default PlayerLobby
