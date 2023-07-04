import React, { useState } from "react"
import TitleForGame from "../../components/titleForGame"
import AdditionalInfo from "../../modules/playerRole/components/additionalInfo"
import BankAccount from "./modules/bankAccount"
import TitleSectionGame from "../../components/titleSectionGame"
import GrayContainer from "../../components/grayContainer"
import BankApplication from "./modules/bankApplication"
import BankCredit from "./modules/bankCredit"
import { useChangeDisplay } from "../../hooks/hooks"
import ButtonPurple from "../../../../components/UI-UX/button_purple"
import CreateOfferInput from "../../modules/createOffer/components/createOfferInput"

function Bank({ bankMoney, actions, bankSalary, roleData }) {
	const [display, changeDisplay] = useChangeDisplay()
	const [displayCredit, changeDisplayCredit] = useChangeDisplay()
	const [displayActiveCredit, changeDisplayActiveCredit] = useChangeDisplay()
	const description =
		"Первое что необходимо сделать: придумать название банка, зарегистрировать его в Центробанке. \n" +
		"Основная функция Коммерческого банка - обеспечить населения деньгами.\n" +
		"Коммерческий банк получает безпроцентный заем у ЦБ (центрального банка), который он обязан вернуть по окончанию игры, иначе размер займа остается госдолгом страны.\n" +
		"Коммерческий банк выдаёт населению кредиты под %, но возможны и другие продукты.\n" +
		"Условия выдачи кредитов и величина процентной ставки назначаются самостоятельно.\n" +
		"Ваш доход – это прибыль, которую вы получаете по итогам каждого игрового периода."
	const needToDo =
		"Общие положения для каждого участника игры: Вам необходимо построить или купить два дома – малый и большой, и заработать три тысячи."

	const [salary, setSalary] = useState("")
	function sendSalaryForm() {
		if (salary !== "") {
			actions.takeMoneyFromBankData({ salary })
		}
	}
	return (
		<div className={"player_role"}>
			<TitleForGame onclick={changeDisplay} title={"Коммерческий банк"} />
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
					<div className="player_role__content">
						<BankAccount text={"Счет банка"} value={bankMoney + " ₽"} />
						<div className={"player_role__content__salary"}>
							<BankAccount text={"Зарплата"} value={bankSalary + " ₽"} />
							<CreateOfferInput
								setValue={setSalary}
								value={salary}
								type={"number"}
								placeholder={"Введите зарплату"}
							/>
							<div className={"player_role__content__salary__button"}>
								<ButtonPurple onclick={sendSalaryForm} children={"Получить зарплату"} />
							</div>
						</div>

						<TitleSectionGame
							onclick={changeDisplayCredit}
							title={"Заявки на кредит"}
						/>
						{displayCredit ? (
							<div className="player_role__content_bank">
								<GrayContainer>
									<BankApplication actions={actions} roleData={roleData} />
								</GrayContainer>
							</div>
						) : (
							<></>
						)}
						<TitleSectionGame
							onclick={changeDisplayActiveCredit}
							title={"Активные кредиты"}
						/>
						{displayActiveCredit ? (
							<div className="player_role__content_bank">
								<GrayContainer>
									<BankCredit actions={actions} roleData={roleData} />
								</GrayContainer>
							</div>
						) : (
							<></>
						)}
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default Bank
