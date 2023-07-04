import React from "react"
import "../../exchangeOffers/styles/offersButtonList.scss"
import InteractionMinisterButton from "../components/interactionMinisterButton"

function InteractionMinisterButtons({
	setDisplayDiploma,
	setDisplayLicenses,
	setDisplayResources,
}) {
	return (
		<div className={"offers_button_list"}>
			<InteractionMinisterButton onclick={setDisplayDiploma} children={"Дипломы"} />
			<InteractionMinisterButton onclick={setDisplayLicenses} children={"Лицензии"} />
			<InteractionMinisterButton onclick={setDisplayResources} children={"Ресурсы"} />
		</div>
	)
}

export default InteractionMinisterButtons
