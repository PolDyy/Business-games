import React from "react"
import "../styles/userLobbyMessage.scss"

function UserLobbyMessage(props) {
	return (
		<div className={"user_lobby_message"}>
			<div className="user_lobby_message__icon"></div>
			<span className="user_lobby_message__message">
				Пожалуйста, дождитесь начала игры
			</span>
		</div>
	)
}

export default UserLobbyMessage
