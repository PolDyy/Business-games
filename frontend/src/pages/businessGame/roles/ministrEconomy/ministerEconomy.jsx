import React from "react"
import "../../modules/playerRole/styles/playerRole.scss"
import TitleForGame from "../../components/titleForGame"
import AdditionalInfo from "../../modules/playerRole/components/additionalInfo"
import MinisterofEconomyForm from "../../modules/playerRole/components/ministerofEconomyForm"
import { useChangeDisplay } from "../../hooks/hooks"
import MinisterOfEconomyForm from "../../modules/playerRole/components/ministerofEconomyForm"

function MinisterEconomy({ actions }) {
	const [display, changeDisplay] = useChangeDisplay()
	const description =
		"Ваша задача – это ценообразование в стране. \n" +
		"В первую очередь необходимо установить цены на образование и лицензии (думой может быть принято решение сделать образование в стране бесплатным).\n" +
		"Далее необходимо установить максимальные процентные ставки, по которым коммерческие банки могут выдавать кредиты. Необходимо установить максимальные цены на строительное сырье, земельные ресурсы, коммуникации и аренду строительного крана. Цены должны быть адекватны вознаграждению, которое выплачивается девелоперу за строительства домов (1000 за малый дом, 2000 за большой дом).\n" +
		"По согласованию с Госдумой цены могут меняться несколько раз за один игровой период, если это необходимо для эффективного экономического развития страны.\n" +
		"Кроме того, необходимо в думе продвинуть закон о налогах и разработать систему налогообложения. Совместно с министерством внутренних дел разработать систему уплаты налогов. \n" +
		"Совместно с Госдумой и Президентом необходимо установить размер и систему оплаты труда всех работников бюджетной сферы. Зарплата выплачивается по итогам каждого игрового периода из средств, поступивших в бюджет страны. \n" +
		"Вы можете по необходимости набирать себе сотрудников из числа Госдумы."
	const needToDo =
		"Общие положения для каждого участника игры: Вам необходимо построить или купить два дома – малый и большой, и заработать три тысячи."
	return (
		<>
			<div className={"player_role"}>
				<TitleForGame onclick={changeDisplay} title={"Министр экономики и финансов"} />
				{display ? (
					<>
						<div className="player_role__container">
							<div className="player_role__container_add_info">
								<AdditionalInfo title={"Описание роли"} descr={description} />
								<AdditionalInfo title={"Что нужно делать?"} descr={needToDo} />
							</div>
							<div className="player_role__container_form">
								<MinisterOfEconomyForm actions={actions} />
							</div>
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	)
}

export default MinisterEconomy
