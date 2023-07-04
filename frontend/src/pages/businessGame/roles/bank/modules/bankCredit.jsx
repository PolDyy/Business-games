import React from "react"
import Offer from "../../../modules/exchangeOffers/components/offer"
import OffersList from "../../../modules/exchangeOffers/components/offersList"
import { getOffersActiveCredit } from "../../../hooks/getters"

function BankCredit({ roleData, actions }) {
	return (
		<>
			<OffersList
				offers={getOffersActiveCredit(roleData.accepted, actions)}
				emptyText={"Нет активных заявок на кредиты."}
			/>
		</>
	)
}

export default BankCredit
