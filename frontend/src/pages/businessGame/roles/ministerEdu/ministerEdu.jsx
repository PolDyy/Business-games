import React from "react"
import "../../modules/playerRole/styles/playerRole.scss"
import AdditionalInfo from "../../modules/playerRole/components/additionalInfo"
import TitleForGame from "../../components/titleForGame"
import GrayContainer from "../../components/grayContainer"
import MinisterEduOffer from "./modules/ministerEduOffer"
import { useChangeDisplay } from "../../hooks/hooks"

function MinisterEdu({ actions, roleData }) {
	const [display, changeDisplay] = useChangeDisplay()
	const description =
		"Обязательное образование в стране должны получить архитекторы и девелоперы. Их образовательная программа должна быть основана на тех требованиях, которые определяются производственным процессом, главным архитектором и требованиям министерства ЖКХ к строительству домов.\n" +
		"Требования к проектам домов должен разработать главный архитектор требования к архитектурным проектам и передать их в министерство образования. Все проекты должны отличаться друг от друга, не может быть двух одинаковых проектов. \n" +
		"Основные неизменные требования по строительству домов заключаются в следующем:\n" +
		"1) Для строительства малого дома необходимо по 1 вида сырья, малый участок земли, кран, коммуникации, проект дома, согласованный с главным архитектором.\n" +
		"2) Для строительства большого дома необходимо по 2 вида сырья, большой участок земли, коммуникации, кран и проект дома, согласованный с главным архитектором.\n" +
		"Обучение должно занимать не более 5 минут, чтобы не тормозить игровой процесс.\n" +
		"Если кто-то из участников захочет получить дополнительное образование, и заниматься не только одним направлением, вы можете установить дополнительную плату, согласовав с министерством экономики и финансов. \n" +
		"Образование может быть также бесплатным.\n" +
		"По итогам обучения каждого участника, ему выдается диплом, куда вписываются его Имя и Фамилия."
	const needToDo =
		"Общие положения для каждого участника игры: Вам необходимо построить или купить два дома – малый и большой, и заработать три тысячи."
	return (
		<div className={"player_role"}>
			<TitleForGame onclick={changeDisplay} title={"Министр образования"} />
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
							<MinisterEduOffer roleData={roleData} actions={actions} />
						</GrayContainer>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default MinisterEdu
