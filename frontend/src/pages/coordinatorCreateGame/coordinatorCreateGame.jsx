import React from "react"
import "./styles/coordinatorCreateGame.scss"
import LayoutGradient from "../../components/layouts/layoutGradient"
import UserConnectGameIcon from "../gamesList/userConnectGame/modules/userConnectGameIcon"

function CoordinatorCreateGame(props) {
	return (
		<div>
			<LayoutGradient>
				<div className={"coordinator_create_game"}>
					<UserConnectGameIcon
						message={"Здесь вы сможете увидеть список проведённых игр!"}
						children={"Создать игру"}
					/>
				</div>
			</LayoutGradient>
		</div>
	)
}

export default CoordinatorCreateGame
