import React from "react"
import "./styles/interactionMinister.scss"
import TitleForGame from "../../components/titleForGame"
import InteractionMinisterButtons from "./modules/interactionMinisterButtons"
import GrayContainer from "../../components/grayContainer"
import InteractionMinisterResources from "./modules/interactionMinisterResources"
import InteractionMinisterLicense from "./modules/interactionMinisterLicense"
import { useChangeDisplay } from "../../hooks/hooks"
import { useState } from "react"
import InteractionMinisterDiploma from "./modules/interactionMinisterDiploma"

function InteractionMinister({ tradeWithMinistersActions, tax }) {
	const [display, changeDisplay] = useChangeDisplay()

	const [displayedForm, setDisplayedForm] = useState("diploma")

	function setForm() {
		switch (displayedForm) {
			case "diploma":
				return (
					<InteractionMinisterDiploma
						tax={tax}
						tradeWithMinistersActions={tradeWithMinistersActions}
					/>
				)
			case "licenses":
				return (
					<InteractionMinisterLicense
						tax={tax}
						tradeWithMinistersActions={tradeWithMinistersActions}
					/>
				)
			case "resources":
				return (
					<InteractionMinisterResources
						tax={tax}
						tradeWithMinistersActions={tradeWithMinistersActions}
					/>
				)
		}
	}

	return (
		<div className={"interaction_minister"}>
			<TitleForGame onclick={changeDisplay} title={"Взаимодействие с министром"} />
			{display ? (
				<>
					<div className="interaction_minister__container">
						<InteractionMinisterButtons
							setDisplayDiploma={() => {
								setDisplayedForm("diploma")
							}}
							setDisplayLicenses={() => {
								setDisplayedForm("licenses")
							}}
							setDisplayResources={() => {
								setDisplayedForm("resources")
							}}
						/>
						<GrayContainer>{setForm()}</GrayContainer>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default InteractionMinister
