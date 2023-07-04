import React from "react"
import Offer from "../../../modules/exchangeOffers/components/offer"
import OffersList from "../../../modules/exchangeOffers/components/offersList"
import { getOffers } from "../../../hooks/getters"

function MinisterZkhOffer({ ministerZkhActions, roleData }) {
	return (
		<div>
			<OffersList
				offers={getOffers(
					roleData,
					ministerZkhActions.acceptLicenseBuy,
					ministerZkhActions.declineLicenseBuy
				)}
				emptyText={"Новых предложений не поступило."}
			/>
		</div>
	)
}

export default MinisterZkhOffer
