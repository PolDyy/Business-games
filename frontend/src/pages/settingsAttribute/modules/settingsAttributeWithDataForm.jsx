import React, { useState } from "react"
import "../styles/settingsAttributeWithDataForm.scss"
import { AttributesAPI } from "../api/AttributesAPI"
import { useDispatch } from "react-redux"
import ButtonPurple from "../../../components/UI-UX/button_purple"

function SettingsAttributeWithDataForm({
	children,
	setValue,
	sendFormCheckBox,
	...props
}) {
	const dispatch = useDispatch()

	const [attribute, setAttribute] = useState("")

	function sendForm() {
		new AttributesAPI(dispatch).addNewAttribute(attribute).then((response) => {
			setValue(response.data)
		})
	}

	return (
		<form className={"settings_attribute_form"}>
			<div className="settings_attribute_form__container">
				<input
					type="text"
					placeholder={"Введите название поля"}
					className="settings_attribute_form__container_input"
					value={attribute}
					onChange={(event) => setAttribute(event.target.value)}
				/>
				<button
					onClick={(event) => {
						event.preventDefault()
						sendForm()
						setAttribute("")
					}}
					className="settings_attribute_form__container_add_attribute btn_reset"
				></button>
			</div>
			<div className="settings_attribute_form__btn">
				<ButtonPurple onclick={sendFormCheckBox} children={"Сохранить"} />
			</div>
		</form>
	)
}

export default SettingsAttributeWithDataForm
