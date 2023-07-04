import React from "react"
import "../styles/createOfferButton.scss"

function CreateOfferButton({ onClick, children, ...props }) {
	return (
		<button
			onClick={(event) => {
				event.preventDefault()
				onClick()
			}}
			className={"create_offer_btn btn_reset"}
		>
			{children}
		</button>
	)
}

export default CreateOfferButton
