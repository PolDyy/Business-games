import React, { useState } from "react"
import "../styles/createOfferDeal.scss"
import CreateOfferInput from "../components/createOfferInput"
import CreateOfferCost from "../components/createOfferCost"
import CreateOfferButton from "../components/createOfferButton"
import CreateOfferSelect from "../components/createOfferSelect"
import { useEffect } from "react"

function CreateOfferDeal({ tradeActions, users }) {
	const [user, setUser] = useState(2)
	const [resource, setResource] = useState("")
	const [price, setPrice] = useState("")
	const [quantity, setQuantity] = useState("")
	const [fullPrice, setFullPrice] = useState(0)

	function getTradeOfferData() {
		return {
			seller_id: user,
			resource: resource,
			quantity: quantity,
			price_per_one: price,
		}
	}

	function sendTradeOffer() {
		tradeActions.createTrade(getTradeOfferData())
		setUser("")
		setPrice("")
		setResource("")
		setQuantity("")
	}

	const options = [
		{ option: "Дерево", value: "wood" },
		{ option: "Стекло", value: "glass" },
		{ option: "Кирпич", value: "brick" },
		{ option: "Черепица", value: "shingles" },
		{ option: "Малый участок земли", value: "small_area" },
		{ option: "Большой участок земли", value: "big_area" },
		{ option: "Кран", value: "crane" },
		{ option: "Коммуникации", value: "communications" },
		{ option: "План малого дома", value: "plan_of_small_house" },
		{ option: "План большого дома", value: "plan_of_big_house" },
		{ option: "Маленький дом", value: "small_house" },
		{ option: "Большой дом", value: "big_house" },
	]

	useEffect(() => {
		setFullPrice(Math.ceil(price * quantity * (1 + 0.05)))
	}, [price])

	return (
		<form className={"create_offer_deal"}>
			<div className="create_offer_deal__left">
				<div className="create_offer_deal__left_big_size">
					<CreateOfferSelect
						options={users}
						value={user}
						setValue={setUser}
						placeholder={"Контрагент"}
					/>
				</div>
				<div className="create_offer_deal__left_big_size">
					<CreateOfferSelect
						options={options}
						value={resource}
						setValue={setResource}
						placeholder={"Ресурс"}
					/>
				</div>
				<div className="create_offer_deal__left_middle_size">
					<CreateOfferInput
						type={"number"}
						value={quantity}
						setValue={setQuantity}
						placeholder={"Количество"}
					/>
				</div>
				<div className="create_offer_deal__left_middle_size">
					<CreateOfferInput
						type={"number"}
						value={price}
						setValue={setPrice}
						placeholder={"Цена"}
					/>
				</div>
			</div>
			<div className="create_offer_deal__right">
				<CreateOfferCost cost={"Итоговая сумма " + fullPrice} />
				<div className="create_offer_deal__right_btn">
					<CreateOfferButton onClick={sendTradeOffer} children={"Предложить сделку"} />
				</div>
			</div>
		</form>
	)
}

export default CreateOfferDeal
