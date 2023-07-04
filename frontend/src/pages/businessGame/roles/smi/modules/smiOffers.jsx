import React from "react"
import Offer from "../../../modules/exchangeOffers/components/offer"
import OffersList from "../../../modules/exchangeOffers/components/offersList"
import { getOffers } from "../../../hooks/getters"

function SmiOffers({ roleData, action }) {
	return (
		<OffersList
			offers={getOffers(
				roleData,
				action.acceptAdvertisingBuy,
				action.declineAdvertisingBuy
			)}
		/>
	)
}

export default SmiOffers
