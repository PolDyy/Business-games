import React from "react"
import "../styles/stopGame.scss"

function StopGame({ onclick }) {
	return (
		<button
			onClick={(event) => {
				event.preventDefault()
				onclick()
			}}
			className="stop_game btn_reset"
		>
			Завершить игру
		</button>
	)
}

export default StopGame
