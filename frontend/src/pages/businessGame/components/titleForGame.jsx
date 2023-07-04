import React, { useState } from "react"
import "./styles/titleForGame.scss"
import { useChangeDisplay } from "../hooks/hooks"

function TitleForGame({ title, onclick, ...props }) {
	const [transform, setTransform] = useChangeDisplay()

	function changeDisplay() {
		onclick()
		setTransform()
	}

	return (
		<div onClick={changeDisplay} className={"title_for_game_container"}>
			<p className={"title_name"}>{title}</p>
			<div className={transform ? "title_arrow_down" : "title_arrow_up"}></div>
		</div>
	)
}

export default TitleForGame
