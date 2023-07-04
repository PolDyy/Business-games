import React from "react"
import "../styles/statusGame.scss"

function StatusGame({ status, value, ...props }) {
	return (
		<div className={"status_game"}>
			<p className={"status_game__status"}>{status}</p>
			<div className={"status_game__year"}>
				<p className={"status_game__year_item"}>Последний год игры:</p>
				<p className={"status_game__year_value"}>{value}</p>
			</div>
		</div>
	)
}

export default StatusGame
