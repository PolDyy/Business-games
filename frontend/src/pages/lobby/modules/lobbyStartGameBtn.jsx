import React from "react"
import "../styles/lobbyStartGameBtn.scss"

function LobbyStartGameBtn({ children }) {
	return <button className={"start_game__btn btn_reset"}>{children}</button>
}

export default LobbyStartGameBtn
