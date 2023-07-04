import React, { useEffect } from "react"
import CreateOfferSelect from "../../createOffer/components/createOfferSelect"
import CreateOfferInput from "../../createOffer/components/createOfferInput"
import CreateOfferCost from "../../createOffer/components/createOfferCost"
import CreateOfferButton from "../../createOffer/components/createOfferButton"
import { useState } from "react"

function InteractionMinisterResources({ tradeWithMinistersActions, tax }) {
	const [resource, setResource] = useState("")
	const [price, setPrice] = useState("")
	const [quantity, setQuantity] = useState("")
	const [fullPrice, setFullPrice] = useState(0)

	const options = [
		{ option: "Малый участок", value: "small_area" },
		{ option: "Большой участок", value: "big_area" },
		{ option: "Кран", value: "crane" },
		{ option: "Коммуникации", value: "communications" },
	]

	function sendForm() {
		const data = {
			resource: resource,
			quantity: quantity,
			price_per_one: price,
		}
		tradeWithMinistersActions.sendTradeToMvd(data)
	}

	useEffect(() => {
		setFullPrice(Math.ceil(price * quantity * (1 + tax / 100)))
	}, [price, quantity, tax])

	return (
		<form className={"create_offer_deal"}>
			<div className="create_offer_deal__left">
				<div className="create_offer_deal__left_big_size create_offer_deal__left_big_size_option">
					<CreateOfferSelect
						options={options}
						value={resource}
						setValue={setResource}
						placeholder={"Ресурс"}
					/>
				</div>
				<div className="create_offer_deal__left_big_size">
					<CreateOfferInput
						value={quantity}
						setValue={setQuantity}
						placeholder={"Количество"}
					/>
				</div>
				<div className="create_offer_deal__left_big_size">
					<CreateOfferInput value={price} setValue={setPrice} placeholder={"Цена"} />
				</div>
				<div className="create_offer_deal__left_big_size">
					<CreateOfferInput disable={true} placeholder={"Налог " + tax + "%"} />
				</div>
			</div>
			<div className="create_offer_deal__right">
				<CreateOfferCost cost={"Итоговая сумма: " + fullPrice} />
				<div className="create_offer_deal__right_btn">
					<CreateOfferButton onClick={sendForm} children={"Оставить заявку"} />
				</div>
			</div>
		</form>
	)
}

export default InteractionMinisterResources
