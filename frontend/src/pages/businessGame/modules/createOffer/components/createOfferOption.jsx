import React from "react"
import "../styles/createOfferOption.scss"

function CreateOfferOption({ option, value, ...props }) {
	return (
		<option className={option} value={value}>
			{option}
		</option>
	)
}

export default CreateOfferOption
