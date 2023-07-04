import React from "react"
import "./styles/lobby.scss"
import LobbyPlayersList from "./modules/lobbyPlayersList"
import StartGameField from "./modules/startGameField"
import ButtonPurple from "../../../../../components/UI-UX/button_purple"
import CodeSection from "../../../../profile/coordinatorProfile/modules/codeSection/codeSection"
import { urls } from "../../../../../urls"
import { useNavigate } from "react-router-dom"

function CoordinatorLobby({ timeStart, lobbyPlayers, actions, code }) {
	const navigate = useNavigate()

	const url =
		window.location.protocol +
		"//" +
		window.location.hostname +
		":" +
		window.location.port +
		urls.businessGame +
		"/" +
		code

	function startGameForm() {
		actions.startGame({})
	}

	function updateCode() {
		actions.updateCode()
	}

	return (
		<div className="lobby">
			<div className="lobby__top">
				<div className="lobby__top_code">
					<CodeSection updateCode={updateCode} url={url} code={code} />
				</div>
				<div className="lobby__top_start_game">
					<StartGameField time={timeStart.time} date={timeStart.date} />
				</div>
			</div>
			<LobbyPlayersList players={lobbyPlayers} />
			<div className="lobby__btn">
				<ButtonPurple onclick={startGameForm} children={"Начать игру"} />
			</div>
		</div>
	)
}

export default CoordinatorLobby
