import React from "react"
import Offer from "../../../modules/exchangeOffers/components/offer"
import OffersList from "../../../modules/exchangeOffers/components/offersList"
import { getOffers } from "../../../hooks/getters"

function MinisterEduOffer({ roleData, actions }) {
	return (
		<OffersList
			offers={getOffers(roleData, actions.acceptDiplomaBuy, actions.declineDiplomaBuy)}
			emptyText={"Нет предложений о покупке диплома."}
		/>
	)
}

export default MinisterEduOffer
