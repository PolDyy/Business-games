import React from "react"
import "./styles/watchActiveGame.scss"
import StopGame from "./modules/stopGame"
import WatchActiveGameTable from "./modules/watchActiveGameTable"
import StatusGame from "./modules/statusGame"
import ButtonPurple from "../../../../components/UI-UX/button_purple"
import StartGameField from "../lobby/coordinatorLobby/modules/startGameField"

function WatchActiveGame({ actions, timeStart, playersData }) {
	function changeYear() {
		actions.changeYear()
	}

	return (
		<div className={"watch_active_game"}>
			<div className="watch_active_game__top">
				<div className="watch_active_game__top_start_game">
					<StartGameField time={timeStart.time} date={timeStart.date} />
				</div>
				<div className="watch_active_game__top_stop_game">
					<StopGame onclick={actions.endGame} />
				</div>
			</div>
			<WatchActiveGameTable players={playersData} />
			<div className="watch_active_game__bottom">
				<StatusGame status={"Игра активна"} value={"4"} />
				<div className="watch_active_game__bottom_btn">
					<ButtonPurple onclick={changeYear} children={"Закончить  год"} />
				</div>
			</div>
		</div>
	)
}

export default WatchActiveGame
