import React from "react"
import "../styles/createOfferCredit.scss"
import CreateOfferInput from "../components/createOfferInput"
import CreateOfferButton from "../components/createOfferButton"
import { useState } from "react"
import CreateOfferSelect from "../components/createOfferSelect"

function CreateOfferCredit({ creditActions, banks }) {
	const [user, setUser] = useState("")
	const [money, setMoney] = useState("")
	const [percent, setPercent] = useState("")

	function getCreditData() {
		return {
			bank_id: user,
			money: money,
			percents: percent,
		}
	}

	function sendCreditOffer() {
		creditActions.createCredit(getCreditData())
		setUser("")
		setMoney(0)
		setPercent(0)
	}

	return (
		<form className={"create_offer_credit"}>
			<div className="create_offer_credit__left">
				<div className="create_offer_credit__left_big_size">
					<CreateOfferSelect
						options={banks}
						value={user}
						setValue={setUser}
						type={"number"}
						placeholder={"Контрагент"}
					/>
				</div>
				<div className="create_offer_credit__left_little_size">
					<CreateOfferInput
						value={money}
						setValue={setMoney}
						type={"number"}
						placeholder={"Сумма"}
					/>
				</div>
				<div className="create_offer_credit__left_middle_size">
					<CreateOfferInput
						value={percent}
						setValue={setPercent}
						type={"number"}
						placeholder={"Процентная ставка"}
					/>
				</div>
				<div className="create_offer_credit__right">
					<div className="create_offer_credit__right_btn">
						<CreateOfferButton onClick={sendCreditOffer} children={"Взять кредит"} />
					</div>
				</div>
			</div>
		</form>
	)
}

export default CreateOfferCredit
