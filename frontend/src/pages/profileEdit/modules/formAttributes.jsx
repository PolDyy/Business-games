import React, { useEffect, useState } from "react"
import "./editStyles/formAttributes.scss"

import InvisibleLabel from "./invisibleLabel"
import FormLabelAttribute from "../components/formLabelAttribute"
import Loads from "../../profile/loads/loads"
import { PlayerProfileApi } from "../api/playerEditApi"
import { useAPIClass } from "../../../utilits/baseApiClasses"

function FormAttributes({ value, setValue }) {
	const [attributesAndValue, setAttributes] = useState([])

	const playerProfileApi = useAPIClass(PlayerProfileApi)

	useEffect(() => {
		playerProfileApi.getAttributes().then((attributes) => {
			setAttributes(attributes)
		})
	}, [])

	function renderAttributes() {
		return attributesAndValue.map((attribute, index) => {
			return (
				<FormLabelAttribute
					valueForm={value}
					setForm={setValue}
					key={index}
					initValue={attribute["value"]}
					value={attributesAndValue}
					setValue={setAttributes}
					htmlFor={attribute["id"]}
					label={attribute["name"]}
					type={"text"}
					placeholder={"Заполните поле"}
				/>
			)
		})
	}

	function renderLoads() {
		return <Loads />
	}

	return (
		<div className="form_attributes">
			{attributesAndValue.length !== 0 ? renderAttributes() : renderLoads()}
			<InvisibleLabel />
		</div>
	)
}

export default FormAttributes
