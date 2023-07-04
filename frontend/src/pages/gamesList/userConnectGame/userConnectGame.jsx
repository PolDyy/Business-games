import React from "react"
import "./styles/userConnectGame.scss"
import LayoutGradient from "../../../components/layouts/layoutGradient"
import UserConnectGameIcon from "./modules/userConnectGameIcon"

function UserConnectGame(props) {
	return (
		<div>
			<LayoutGradient>
				<div className="user_connect_game_container">
					<UserConnectGameIcon
						message={"Вы сможете увидеть список игр здесь, как только начнёте играть!"}
						children={"Присоединиться к игре"}
					/>
				</div>
			</LayoutGradient>
		</div>
	)
}

export default UserConnectGame
