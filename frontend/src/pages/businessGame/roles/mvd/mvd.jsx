import React from "react"
import "./styles/mvd.scss"
import TitleForGame from "../../components/titleForGame"
import AdditionalInfo from "../../modules/playerRole/components/additionalInfo"
import MvdForm from "./modules/mvdForm"
import GrayContainer from "../../components/grayContainer"
import MvdOffers from "./modules/mvdOffers"
import { useChangeDisplay } from "../../hooks/hooks"

function Mvd({ roleData, actions }) {
	const [display, changeDisplay] = useChangeDisplay()

	const description =
		"Вам необходимо организовать работу следующих служб:\n" +
		"Судья\n" +
		"Министр внутренних дел сам может являться судьей, либо назначаться из числа депутатов Госдумы. Судья – лицо, осуществляющее правосудие. Он должен рассматривать жалобы, поступающие от участников, передавать дела в полицию и организовать судебное разбирательство. Судья вправе самостоятельно назначать меру наказания или собрать суд присяжных.\n" +
		"Полиция\n" +
		"Полиция предназначена для защиты жизни, здоровья, прав и свобод граждан страны, для противодействия преступности, охраны общественного порядка, собственности и для обеспечения общественной безопасности. Полиция напрямую взаимодействует с судебным органом.\n" +
		"Полицейский в любой момент может приостановить деятельность любого игрока, выдвинув ему обвинение, и передать его дело в суд.\n" +
		"Полиция выискивает правонарушителей и вершит правосудие. \n" +
		"Лицензионная комиссия\n" +
		"Задача лицензионной комиссии выдавать лицензии на соответствующие виды деятельности. Лицензия может быть платной или бесплатной, может быть выдана только при наличии соответствующего образования, что должно подтверждаться дипломом об образовании. Образование и лицензия обязательны для архитекторов и девелоперов. Производителям необходимы только лицензия на каждый отдельный вид сырья. \n" +
		"Начальник налоговой службы\n" +
		"Основная задача установить налогооблагаемые виды деятельности, устанавливать налоговые ставки, следить за тем, чтобы налоги своевременно и в полном объеме поступали в казну.\n" +
		"Можно набирать себе сотрудников из числа госдумы, которые будут собирать налоги.\n" +
		"Основной доход сотрудников МВД – это зарплата из бюджета государства. Все штрафы, налоги и доход от продажи лицензий поступают в казну государства."
	const needToDo =
		"Общие положения для каждого участника игры: Вам необходимо построить или купить два дома – малый и большой, и заработать три тысячи."

	return (
		<>
			<div className={"player_role"}>
				<TitleForGame onclick={changeDisplay} title={"МВД"} />
				{display ? (
					<>
						<div className="player_role__container">
							<div className="player_role__container_add_info player_role__container_mvd">
								<AdditionalInfo title={"Описание роли"} descr={description} />
								<AdditionalInfo title={"Что нужно делать?"} descr={needToDo} />
							</div>
							<div className="player_role__container_form">
								<MvdForm />
							</div>
						</div>
						<div className="player_role__offer">
							<GrayContainer>
								<MvdOffers roleData={roleData} ministerMVDActions={actions} />
							</GrayContainer>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	)
}

export default Mvd
