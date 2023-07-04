import React from "react"
import "../styles/createOfferCost.scss"

function CreateOfferCost({ cost, ...props }) {
	return <p className={"create_offer_cost"}>{cost}</p>
}

export default CreateOfferCost
