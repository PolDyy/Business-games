import React, { useEffect, useState } from "react"
import "./coordinatorComponentsStyle/coordinatorCodeSection.scss"
import { CoordinatorInfo } from "../../../api/coordinatorProfileApi"
import { useDispatch } from "react-redux"
import CodeSection from "../codeSection/codeSection"
import { urls } from "../../../../../urls"

function CoordinatorCodeSectionFill() {
	const dispatch = useDispatch()

	const coordinatorInfo = new CoordinatorInfo(dispatch)

	function getCode() {
		return coordinatorInfo.getInviteCode().then((response) => {
			setCode(response.data.invite_code)
		})
	}

	function updateInviteCode() {
		return coordinatorInfo.updateInviteCode().then((response) => {
			setCode(response.data.invite_code)
		})
	}

	useEffect(() => {
		getCode()
	}, [])

	const [code, setCode] = useState("*******")

	const url =
		window.location.protocol +
		"//" +
		window.location.hostname +
		":" +
		window.location.port +
		urls.signUp +
		"/" +
		code

	return <CodeSection code={code} url={url} updateCode={updateInviteCode} />
}

export default CoordinatorCodeSectionFill
