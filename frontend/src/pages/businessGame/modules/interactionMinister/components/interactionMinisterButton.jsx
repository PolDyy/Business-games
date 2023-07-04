import React from "react"
import "../styles/interactionMinisterButton.scss"

function InteractionMinisterButton({ children, onclick, ...props }) {
	return (
		<button onClick={onclick} className={"interaction_minister_btn btn_reset"}>
			{children}
		</button>
	)
}

export default InteractionMinisterButton
