import React from "react"
import "./styles/formLabel.scss"

function FormLabelAttribute({
	initValue,
	htmlFor,
	value,
	setValue,
	label,
	type,
	placeholder,
	valueForm,
	setForm,
}) {
	function changeValueAttribute(event) {
		let newObjectAttributesAndValue = [...value]
		for (const index in newObjectAttributesAndValue) {
			if (newObjectAttributesAndValue[index].id === htmlFor) {
				newObjectAttributesAndValue[index].value = event.target.value
			}
		}
		setValue(newObjectAttributesAndValue)

		let newValueForm = { ...valueForm }
		newValueForm[htmlFor] = event.target.value
		setForm(newValueForm)
	}
	return (
		<label className="form_label form_label_attribute">
			{label}
			<input
				className="form_edit_input form_edit_input_attribute"
				onChange={(event) => {
					changeValueAttribute(event)
				}}
				value={initValue}
				type={type}
				placeholder={placeholder}
			/>
		</label>
	)
}

export default FormLabelAttribute
