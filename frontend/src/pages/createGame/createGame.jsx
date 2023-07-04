import React, { useEffect, useState } from "react"
import "./createGame.scss"
import InputNameGame from "./modules/inputNameGame"
import InputStartGame from "./modules/inputStartGame"
import CheckboxAttributeList from "../../components/checkBoxAttributeList/checkboxAttributeList"
import Layout from "../../components/layouts/layout"
import { CreateGameApi } from "./api/createGameApi"
import ButtonPurple from "../../components/UI-UX/button_purple"
import { useAPIClass } from "../../utilits/baseApiClasses"

function CreateGame() {
	const [gameName, setGameName] = useState("")
	const [timeStart, setTimeStart] = useState("")
	const [checkBoxData, setCheckBoxData] = useState({})
	const [listAttributes, setListAttributes] = useState([])

	const createGameApi = useAPIClass(CreateGameApi)

	function sendCreateGameForm() {
		let data = {
			game_name: gameName,
			time_start: timeStart,
			required_attributes: checkBoxData,
		}

		createGameApi.postCreateGame(data)
	}

	useEffect(() => {
		createGameApi.getCoordinatorAttributes().then((data) => {
			setListAttributes(data)
		})
	}, [])

	return (
		<>
			<Layout />
			<div className="create_game_body">
				<div className="create_game_left">
					<InputNameGame value={gameName} setValue={setGameName} />
					<div className="start_game_container">
						<InputStartGame
							placeholder={"Не указано"}
							type={"datetime-local"}
							label={"Время старта игры"}
							changeValue={setTimeStart}
						/>
						<div className="start_game_container__btn">
							<ButtonPurple onclick={sendCreateGameForm} children={"Создать игру"} />
						</div>
					</div>
				</div>
				<div className="checkbox_attribute_list_container">
					<CheckboxAttributeList dataList={listAttributes} setValue={setCheckBoxData} />
				</div>
			</div>
		</>
	)
}

export default CreateGame
