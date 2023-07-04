import React from "react"
import "../burgerStyles/playerInputJoinGame.scss"

function PlayerInputJoinGame({ gameCode, setGameCode }) {
	return (
		<input
			value={gameCode}
			onChange={(event) => {
				setGameCode(event.target.value)
			}}
			className={"input_join_game"}
			placeholder={"Введите пригласительный код"}
		></input>
	)
}

export default PlayerInputJoinGame
