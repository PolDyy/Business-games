import React from "react"
import TitleForGame from "../../components/titleForGame"
import AdditionalInfo from "../../modules/playerRole/components/additionalInfo"
import GrayContainer from "../../components/grayContainer"
import SmiOffers from "./modules/smiOffers"
import { useChangeDisplay } from "../../hooks/hooks"

function Smi({ actions, roleData }) {
	const [display, changeDisplay] = useChangeDisplay()
	const description =
		"Освещает события происходящих в стране, является независимым «экспертом событий», может проводить независимые расследования, в таких случаях возможно взаимодействие с полицией по сбору улик.\n" +
		"Зарплата из бюджета, но возможна организация своего дохода за счет рекламы и прочих продуктов."
	const needToDo =
		"Вам необходимо получить образование, пройдя обучение у главного архитектора, после этого можно будет приобрести лицензию. \n" +
		"Общие положения для каждого участника игры: Вам необходимо построить или купить два дома – малый и большой, и заработать три тысячи."
	return (
		<div className={"player_role"}>
			<TitleForGame onclick={changeDisplay} title={"СМИ"} />
			{display ? (
				<>
					<div className="player_role__body">
						<div className="player_role__body_info">
							<AdditionalInfo title={"Описание роли"} descr={description} />
						</div>
						<div className="player_role__body_info">
							<AdditionalInfo title={"Что нужно делать?"} descr={needToDo} />
						</div>
					</div>
					<div className="player_role__offer">
						<GrayContainer>
							<SmiOffers action={actions} roleData={roleData} />
						</GrayContainer>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default Smi
