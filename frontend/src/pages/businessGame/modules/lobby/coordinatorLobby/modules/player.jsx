import React from "react"
import "../styles/player.scss"

function Player({ name, ...props }) {
	return (
		<div className={"player"}>
			<p className="player__name">{name}</p>
			<button className="player__arrow btn_reset"></button>
		</div>
	)
}

export default Player
