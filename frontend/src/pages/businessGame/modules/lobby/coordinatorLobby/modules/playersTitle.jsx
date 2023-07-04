import React from "react"
import "../styles/playersTitle.scss"

function PlayersTitle(props) {
	return (
		<div className={"player_title"}>
			<div className="player_title__players">
				<div className="player_title__players_icon"></div>
				<p className="player_title__players_text">Участники</p>
			</div>
			<div className="player_title__search"></div>
		</div>
	)
}

export default PlayersTitle
