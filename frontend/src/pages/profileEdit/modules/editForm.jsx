import React, { useState } from "react"
import "./editStyles/editForm.scss"
import FormFullName from "./formFullName"
import FormAttributes from "./formAttributes"
import EditTop from "../generic/editTop"
import { useSelector } from "react-redux"
import { PlayerProfileApi } from "../api/playerEditApi"
import { PlayerInfo } from "../../profile/api/playerProfileApi"
import { useAPIClass } from "../../../utilits/baseApiClasses"

function EditForm() {
	const user = useSelector((state) => state.user)

	const [fullName, setFullName] = useState({
		first_name: user.user.first_name,
		last_name: user.user.last_name,
		patronymic: user.user.patronymic,
	})

	const playerProfileApi = useAPIClass(PlayerProfileApi)
	const playerInfo = useAPIClass(PlayerInfo)

	const [attributesAndValue, setAttributeAndValue] = useState({})
	console.log(attributesAndValue)
	function sendForm() {
		playerProfileApi.sendForm({ fullName, attributesAndValue })
		playerInfo.getPlayerInfo()
	}

	return (
		<form action={""} method={"Post"}>
			<EditTop fullName={fullName} sendForm={sendForm} />
			<FormFullName fullName={fullName} setFullname={setFullName} />
			<FormAttributes value={attributesAndValue} setValue={setAttributeAndValue} />
		</form>
	)
}

export default EditForm
