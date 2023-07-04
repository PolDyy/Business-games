import React from "react"
import OffersList from "../../../modules/exchangeOffers/components/offersList"
import { getOffers } from "../../../hooks/getters"

function MvdOffers({ ministerMVDActions, roleData }) {
	return (
		<OffersList
			offers={getOffers(
				roleData,
				ministerMVDActions.acceptMvdTrade,
				ministerMVDActions.closeMvdTrade
			)}
			emptyText={"Новых предложений не поступило."}
		/>
	)
}

export default MvdOffers
