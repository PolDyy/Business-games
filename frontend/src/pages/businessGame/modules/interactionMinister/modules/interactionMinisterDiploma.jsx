import React from "react"
import "../styles/interactionMinisterDiploma.scss"
import CreateOfferSelect from "../../createOffer/components/createOfferSelect"
import CreateOfferInput from "../../createOffer/components/createOfferInput"
import CreateOfferCost from "../../createOffer/components/createOfferCost"
import CreateOfferButton from "../../createOffer/components/createOfferButton"
import { useEffect, useState } from "react"

function InteractionMinisterDiploma({ tradeWithMinistersActions, tax }) {
	const [diploma, setDiploma] = useState("")
	const [price, setPrice] = useState("")
	const [fullPrice, setFullPrice] = useState(0)

	const options = [
		{ option: "Диплом строителя", value: "building_diploma" },
		{ option: "Диплом архитектора", value: "architect_diploma" },
	]

	function sendForm() {
		const data = {
			diploma: diploma,
			price_per_one: price,
		}
		tradeWithMinistersActions.sendTradeToEducationMinister(data)
	}
	useEffect(() => {
		setFullPrice(Math.ceil(price * (1 + tax / 100)))
	}, [price, tax])

	return (
		<form className={"create_offer_deal"}>
			<div className="create_offer_deal__left">
				<div className="create_offer_deal__left_big_size create_offer_deal__left_bigger_size_option">
					<CreateOfferSelect
						options={options}
						value={diploma}
						setValue={setDiploma}
						placeholder={"Диплом"}
					/>
				</div>
				<div className="create_offer_deal__left_big_size">
					<CreateOfferInput value={price} setValue={setPrice} placeholder={"Цена"} />
				</div>
				<div className="create_offer_deal__left_big_size">
					<CreateOfferInput disable={true} placeholder={"Налог " + 5 + "%"} />
				</div>
			</div>
			<div className="create_offer_deal__right">
				<CreateOfferCost cost={"Итоговая сумма " + fullPrice} />
				<div className="create_offer_deal__right_btn">
					<CreateOfferButton onClick={sendForm} children={"Оставить заявку"} />
				</div>
			</div>
		</form>
	)
}

export default InteractionMinisterDiploma
