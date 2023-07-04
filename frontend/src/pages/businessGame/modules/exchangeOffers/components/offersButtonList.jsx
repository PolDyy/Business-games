import React from "react"
import "../styles/offersButtonList.scss"
import OffersButton from "./offersButton"

function OffersButtonList({
	incoming,
	outgoing,
	closed,
	setIncoming,
	setClosed,
	setOutgoing,
}) {
	return (
		<div className={"offers_button_list"}>
			<OffersButton children={"Входящие"} count={incoming} onclick={setIncoming} />
			<OffersButton children={"Исходящие"} count={outgoing} onclick={setOutgoing} />
			<OffersButton children={"Закрытые"} count={closed} onclick={setClosed} />
		</div>
	)
}

export default OffersButtonList
