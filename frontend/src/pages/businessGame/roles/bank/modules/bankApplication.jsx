import React from "react"
import OffersList from "../../../modules/exchangeOffers/components/offersList"
import { getOffers, getOffersCredit } from "../../../hooks/getters"

function BankApplication({ roleData, actions }) {
	return (
		<>
			<OffersList
				offers={getOffersCredit(roleData.open, actions)}
				emptyText={"Нет активных заявок на кредиты."}
			/>
		</>
	)
}

export default BankApplication
