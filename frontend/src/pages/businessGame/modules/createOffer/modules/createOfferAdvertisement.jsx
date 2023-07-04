import React, { useState } from "react"
import "../styles/createOfferAdvertisement.scss"
import CreateOfferInput from "../components/createOfferInput"
import CreateOfferCost from "../components/createOfferCost"
import CreateOfferButton from "../components/createOfferButton"
import CreateOfferSelect from "../components/createOfferSelect"

function CreateOfferAdvertisement({ tradeWithMinistersActions, smi, tax }) {
	const [user, setUser] = useState("")
	const [price, setPrice] = useState("")
	const [quantity, setQuantity] = useState("")

	function sendForm() {
		const data = {
			smi_id: user,
			quantity: quantity,
			price_per_one: price,
		}

		tradeWithMinistersActions.sendTradeToSmi(data)
	}

	return (
		<form className={"create_offer_advertisement"}>
			<div className="create_offer_advertisement__left">
				<div className="create_offer_advertisement__left_big_size">
					<CreateOfferSelect
						options={smi}
						value={user}
						setValue={setUser}
						placeholder={"Контрагент"}
					/>
				</div>
				<div className="create_offer_advertisement__left_big_size">
					<CreateOfferInput value={price} setValue={setPrice} placeholder={"Цена"} />
				</div>
				<div className="create_offer_advertisement__left_big_size">
					<CreateOfferInput
						value={quantity}
						setValue={setQuantity}
						placeholder={"Количество"}
					/>
				</div>
				<div className="create_offer_advertisement__left_big_size">
					<CreateOfferInput disable={true} placeholder={"Налог " + tax + "%"} />
				</div>
			</div>
			<div className="create_offer_advertisement__right">
				<CreateOfferCost cost={"Итоговая сумма"} />
				<div className="create_offer_advertisement__right_btn">
					<CreateOfferButton onClick={sendForm} children={"Купить рекламу"} />
				</div>
			</div>
		</form>
	)
}

export default CreateOfferAdvertisement
