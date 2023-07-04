import React, { useState } from "react"
import "../styles/mvdForm.scss"
import GrayContainer from "../../../components/grayContainer"
import InputGame from "../../../modules/playerRole/components/inputGame"
import ButtonPurple from "../../../../../components/UI-UX/button_purple"
import { useNotice } from "../../../../../services/noticeService"

function MvdForm({ actions, ...props }) {
	const [lifeTimeBuilding, setLifeTimeBuilding] = useState()
	const [lifeTimeArchitecture, setLifeTimeArchitecture] = useState()
	const [lifeTimeWood, setLifeTimeWood] = useState()
	const [lifeTimeGlass, setLifeTimeGlass] = useState()
	const [lifeTimeBrick, setLifeTimeBrick] = useState()
	const [lifeTimeShingles, setLifeTimeShingles] = useState()
	const noticeService = useNotice()

	function sendForm() {
		if (
			(lifeTimeBuilding,
			lifeTimeArchitecture,
			lifeTimeWood,
			lifeTimeGlass,
			lifeTimeBrick,
			lifeTimeShingles !== "")
		) {
			const data = {
				building_license: lifeTimeBuilding,
				architecting_license: lifeTimeArchitecture,
				wood_license: lifeTimeWood,
				glass_license: lifeTimeGlass,
				brick_license: lifeTimeBrick,
				shingles_license: lifeTimeShingles,
			}

			actions.setLicensesLifeTime(data)
		} else {
			noticeService.addInfoNotice("Вы не заполнили все поля.")
		}
	}

	return (
		<GrayContainer>
			<form className="mvd_form">
				<InputGame
					value={lifeTimeBuilding}
					setValue={setLifeTimeBuilding}
					placeholder={"Лицензия на строительство"}
				/>
				<InputGame
					value={lifeTimeArchitecture}
					setValue={setLifeTimeArchitecture}
					placeholder={"Лицензия на архитектурную деятельность"}
				/>
				<InputGame
					value={lifeTimeWood}
					setValue={setLifeTimeWood}
					placeholder={"Лицензия на дерево"}
				/>
				<InputGame
					value={lifeTimeGlass}
					setValue={setLifeTimeGlass}
					placeholder={"Лицензия на стекло"}
				/>
				<InputGame
					value={lifeTimeBrick}
					setValue={setLifeTimeBrick}
					placeholder={"Лицензия на кирпич"}
				/>
				<InputGame
					value={lifeTimeShingles}
					setValue={setLifeTimeShingles}
					placeholder={"Лицензия на черепицу"}
				/>
				<div className="mvd_form__btn">
					<ButtonPurple onclick={sendForm} children={"Сохранить"} />
				</div>
			</form>
		</GrayContainer>
	)
}

export default MvdForm
