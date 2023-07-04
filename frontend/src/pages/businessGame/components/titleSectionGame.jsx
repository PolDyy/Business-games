import React from "react"
import "./styles/titleSectionGame.scss"
import { useChangeDisplay } from "../hooks/hooks"

function TitleSectionGame({ title, onclick, ...props }) {
	const [transform, setTransform] = useChangeDisplay()

	function changeDisplay() {
		onclick()
		setTransform()
	}

	return (
		<div onClick={changeDisplay} className={"title_section_game_container"}>
			<p className="title_section_game">{title}</p>
			<div
				className={
					transform ? "title_section_game_arrow_up" : "title_section_game_arrow_down"
				}
			></div>
		</div>
	)
}

export default TitleSectionGame
