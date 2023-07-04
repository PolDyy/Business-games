import React from "react"
import "../styles/createOfferSelect.scss"
import CreateOfferOption from "./createOfferOption"

function CreateOfferSelect({ options, value, setValue }) {
	return (
		<select
			value={value}
			onChange={(event) => setValue(event.target.value)}
			className={"offer_select"}
		>
			<option value="">Выберите игрока</option>
			{options.map((option, index) => {
				return (
					<CreateOfferOption key={index} option={option.option} value={option.value} />
				)
			})}
		</select>
	)
}

export default CreateOfferSelect
