import React, { useState } from "react"
import "./styles/ministrofEconomyForm.scss"
import InputGame from "./inputGame"
import GrayContainer from "../../../components/grayContainer"
import ButtonPurple from "../../../../../components/UI-UX/button_purple"
import { useNotice } from "../../../../../services/noticeService"

function MinisterOfEconomyForm({ actions }) {
	const [priceSmallArea, setPriceSmallArea] = useState("")
	const [priceBigArea, setPriceBigArea] = useState("")
	const [priceTap, setPriceTap] = useState("")
	const [priceCommunicate, setPriceCommunicate] = useState("")
	const [priceDiplomaArchitector, setPriceDiplomaArchitector] = useState("")
	const [priceDiplomaBuilder, setPriceDiplomaBuilder] = useState("")
	const [percentBank, setPercentBank] = useState("")
	const [tax, setTax] = useState("")

	const noticeService = useNotice()

	function sendForm() {
		if (
			(priceSmallArea,
			priceBigArea,
			priceTap,
			priceCommunicate,
			priceDiplomaArchitector,
			priceDiplomaBuilder,
			percentBank,
			tax !== "")
		) {
			const data = {
				small_area: priceSmallArea,
				big_area: priceBigArea,
				crane: priceTap,
				communications: priceCommunicate,
				builder_diploma: priceDiplomaBuilder,
				architect_diploma: priceDiplomaArchitector,
				percent_credit: percentBank,
				tax: tax,
			}
			actions.setControlledPrices(data)
		} else {
			noticeService.addInfoNotice("Вы не заполнили все поля.")
		}
	}

	return (
		<GrayContainer>
			<form className={"minister_of_economy_form"}>
				<InputGame
					type={"number"}
					min={0}
					value={priceSmallArea}
					setValue={setPriceSmallArea}
					placeholder={"Маленький участок"}
				/>
				<InputGame
					type={"number"}
					min={0}
					value={priceBigArea}
					setValue={setPriceBigArea}
					placeholder={"Большой участок участок"}
				/>
				<InputGame
					type={"number"}
					min={0}
					value={priceTap}
					setValue={setPriceTap}
					placeholder={"Цена на кран"}
				/>
				<InputGame
					type={"number"}
					min={0}
					value={priceCommunicate}
					setValue={setPriceCommunicate}
					placeholder={"Цена на коммуникации"}
				/>
				<InputGame
					type={"number"}
					min={0}
					value={priceDiplomaArchitector}
					setValue={setPriceDiplomaArchitector}
					placeholder={"Цена на диплом архитектора"}
				/>
				<InputGame
					type={"number"}
					min={0}
					value={priceDiplomaBuilder}
					setValue={setPriceDiplomaBuilder}
					placeholder={"Цена на диплом строителя"}
				/>
				<InputGame
					type={"number"}
					min={0}
					value={percentBank}
					setValue={setPercentBank}
					placeholder={"Процентная ставка для банков"}
				/>
				<InputGame
					type={"number"}
					min={0}
					value={tax}
					setValue={setTax}
					placeholder={"Налоговая ставка в %"}
				/>
				<div className="minister_of_economy_form__btn">
					<ButtonPurple onclick={sendForm} children={"Сохранить"} />
				</div>
			</form>
		</GrayContainer>
	)
}

export default MinisterOfEconomyForm
