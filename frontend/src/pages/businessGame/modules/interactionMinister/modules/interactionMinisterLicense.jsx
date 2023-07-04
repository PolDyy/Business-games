import React from "react"
import "../styles/interactionMinisterLicense.scss"
import CreateOfferSelect from "../../createOffer/components/createOfferSelect"
import CreateOfferInput from "../../createOffer/components/createOfferInput"
import CreateOfferCost from "../../createOffer/components/createOfferCost"
import CreateOfferButton from "../../createOffer/components/createOfferButton"
import { useEffect, useState } from "react"

function InteractionMinisterLicense({ tradeWithMinistersActions, tax }) {
	const [resourceLicense, setResourceLicense] = useState("")
	const [price, setPrice] = useState("")
	const [fullPrice, setFullPrice] = useState(0)

	const options = [
		{ option: "Лицензия на строительство", value: "building_license" },
		{ option: "Лицензия на архитектурную деятельность", value: "architecting_license" },
		{ option: "Лицензия на дерево", value: "wood_license" },
		{ option: "Лицензия на стекло", value: "glass_license" },
		{ option: "Лицензия на кирпич", value: "brick_license" },
		{ option: "Лицензия на черепицу", value: "shingles_license" },
	]

	function sendForm() {
		const data = {
			resource_license: resourceLicense,
			price_per_one: price,
		}
		tradeWithMinistersActions.sendTradeToJkh(data)
	}

	useEffect(() => {
		setFullPrice(Math.ceil(price * (1 + tax / 100)))
	}, [price, tax])

	return (
		<form className={"create_offer_deal"}>
			<div className="create_offer_deal__left">
				<div className="create_offer_deal__left_big_size create_offer_deal__left_bigger_size_option">
					<CreateOfferSelect
						value={resourceLicense}
						setValue={setResourceLicense}
						options={options}
						placeholder={"Ресурс"}
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
				<CreateOfferCost cost={"Итоговая сумма " + fullPrice} />
				<div className="create_offer_deal__right_btn">
					<CreateOfferButton onClick={sendForm} children={"Оставить заявку"} />
				</div>
			</div>
		</form>
	)
}

export default InteractionMinisterLicense
