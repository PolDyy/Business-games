import React from "react"
import "../styles/userConnectGameIcon.scss"

function UserConnectGameIcon({ message, children, ...props }) {
	return (
		<div className={"user_connect_game_icon"}>
			<div className="user_connect_game_icon__cube"></div>
			<spn className="user_connect_game_icon__text">{message}</spn>
			<button className="user_connect_game_icon__btn btn_reset">{children}</button>
		</div>
	)
}

export default UserConnectGameIcon
