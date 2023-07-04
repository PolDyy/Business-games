import React from "react"
import "../styles/enterDataNameForm.scss"
import FormLabel from "../../profileEdit/components/formLabel"

function EnterDataNameForm(props) {
	return (
		<div className={"enter_data_name_form"}>
			<FormLabel
				variableName={"last_name"}
				label={"Фамилия"}
				type={"text"}
				placeholder={"Не указана"}
			/>
			<FormLabel
				variableName={"first_name"}
				label={"Имя"}
				type={"text"}
				placeholder={"Не указано"}
			/>
			<FormLabel
				variableName={"patronymic"}
				label={"Отчество"}
				type={"text"}
				placeholder={"Не указано"}
			/>
		</div>
	)
}

export default EnterDataNameForm
