import React from "react"
import "./burgerStyles/coordinatorBurger.scss"
import LinksBurgerCoordinator from "./modules/linksBurgerCoordinator"
import ButtonLogout from "./modules/buttonLogout"
import ButtonCreateGame from "./modules/buttonCreateGame"
import ButtonPurple from "../../../UI-UX/button_purple"
import { useNavigate } from "react-router-dom"
import { urls } from "../../../../urls"

function CoordinatorBurger(props) {
	const navigate = useNavigate()

	function redirectToCreateGame() {
		navigate(urls.createGame)
	}

	return (
		<>
			<div className={"burger_container_content"}>
				<div className={"burger_modal_content"}>
					<LinksBurgerCoordinator />
					<ButtonLogout />
				</div>
				<div className="button_create_game_container">
					<ButtonPurple onclick={redirectToCreateGame} children={"Создать игру"} />
				</div>
			</div>
		</>
	)
}

export default CoordinatorBurger
