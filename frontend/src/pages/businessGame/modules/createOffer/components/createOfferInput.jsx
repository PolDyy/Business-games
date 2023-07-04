import React from "react"
import "../styles/createOfferInput.scss"

function CreateOfferInput({ type, value, setValue, placeholder, disable, ...props }) {
	return (
		<input
			type={type}
			value={value}
			onChange={(event) => {
				setValue(event.target.value)
			}}
			className={"create_offer_input"}
			placeholder={placeholder}
			disabled={disable}
		></input>
	)
}

export default CreateOfferInput
