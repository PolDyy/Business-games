import React from "react"
import "../styles/settingsAttributeWithDataList.scss"
import CheckboxAttribute from "../../createGame/modules/checkboxAttribute"

function SettingsAttributeWithDataList(props) {
	return (
		<div className={"settings_attribute_list"}>
			<CheckboxAttribute text={"Имя"} />
			<CheckboxAttribute text={"Фамилия"} />
			<CheckboxAttribute text={"Отчество"} />
			<CheckboxAttribute text={"Дата рождения"} />
			<CheckboxAttribute text={"Телефон"} />
			<CheckboxAttribute text={"Должность"} />
		</div>
	)
}

export default SettingsAttributeWithDataList
