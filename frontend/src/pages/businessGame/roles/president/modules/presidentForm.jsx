import React, { useState } from "react"
import "../styles/presidentForm.scss"
import GrayContainer from "../../../components/grayContainer"
import InputGame from "../../../modules/playerRole/components/inputGame"
import ButtonPurple from "../../../../../components/UI-UX/button_purple"
import { useNotice } from "../../../../../services/noticeService"

function PresidentForm({ value, actions, ...props }) {
	const [salaryPresident, setSalaryPresident] = useState("")
	const [salaryMVD, setSalaryMVD] = useState("")
	const [salaryJKH, setSalaryJKH] = useState("")
	const [salaryMinisterEconomy, setSalaryMinisterEconomy] = useState("")
	const [salaryMinisterEducation, setSalaryMinisterEducation] = useState("")
	const [salarySMI, setSalarySMI] = useState("")

	const noticeService = useNotice()

	function sendForm() {
		if (
			(salaryPresident,
			salaryMVD,
			salaryJKH,
			salaryMinisterEconomy,
			salaryMinisterEducation,
			salarySMI !== "")
		) {
			const data = {
				total_wage:
					salaryPresident +
					salaryMVD +
					salaryJKH +
					salaryMinisterEconomy +
					salaryMinisterEducation +
					salarySMI,
				payments: {
					president: salaryPresident,
					MVD: salaryMVD,
					minister_economy: salaryMinisterEconomy,
					minister_education: salaryMinisterEducation,
					minister_JKH: salaryJKH,
					SMI: salarySMI,
				},
			}
			actions.setWages(data)
		} else {
			noticeService.addErrorNotice("Вы не заполнили все поля.")
		}
	}

	return (
		<GrayContainer>
			<form className={"president_form"}>
				<InputGame
					type={"number"}
					value={salaryPresident}
					setValue={setSalaryPresident}
					placeholder={"Президент"}
				/>
				<InputGame
					type={"number"}
					value={salaryMVD}
					setValue={setSalaryMVD}
					placeholder={"МВД"}
				/>
				<InputGame
					type={"number"}
					value={salaryJKH}
					setValue={setSalaryJKH}
					placeholder={"Министр ЖКХ"}
				/>
				<InputGame
					type={"number"}
					value={salaryMinisterEconomy}
					setValue={setSalaryMinisterEconomy}
					placeholder={"Министр экономики и финансов"}
				/>
				<InputGame
					type={"number"}
					value={salaryMinisterEducation}
					setValue={setSalaryMinisterEducation}
					placeholder={"Министр образования"}
				/>
				<InputGame
					type={"number"}
					value={salarySMI}
					setValue={setSalarySMI}
					placeholder={"СМИ"}
				/>
				<div className="president_form__treasury">
					<p className="president_form__treasury_item">Казна</p>
					<p className="president_form__treasury_item">{value}</p>
				</div>
				<div className="president_form__btn">
					<ButtonPurple onclick={sendForm} children={"Сохранить"} />
				</div>
			</form>
		</GrayContainer>
	)
}

export default PresidentForm
