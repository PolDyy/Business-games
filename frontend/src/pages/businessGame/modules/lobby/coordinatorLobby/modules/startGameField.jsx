import React from "react"
import "../styles/startGameField.scss"

function StartGameField({ time, date, ...props }) {
	return (
		<div className={"start_game"}>
			<p className="start_game__title">Время старта игры</p>
			<div className="start_game__container">
				<p className="start_game__container_datetime">{time}</p>
				<p className="start_game__container_datetime">{date}</p>
			</div>
		</div>
	)
}

export default StartGameField
