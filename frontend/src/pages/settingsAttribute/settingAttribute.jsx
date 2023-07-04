import React, { useEffect } from "react"
import "./styles/settingsAttributeWithData.scss"
import Layout from "../../components/layouts/layout"
import SettingsAttributeWithDataForm from "./modules/settingsAttributeWithDataForm"
import CheckboxAttributeList from "../../components/checkBoxAttributeList/checkboxAttributeList"
import { useState } from "react"
import { AttributesAPI } from "./api/AttributesAPI"
import { useAPIClass } from "../../utilits/baseApiClasses"
import { LoaderComponent, useLoader } from "../../hooks/hooks"

function SettingAttribute() {
	const [checkBoxData, setCheckBoxData] = useState({})

	const [loaderStatus, updateLoaderStatus] = useLoader()

	const [attributes, setAttributes] = useState([])

	const attributesAPI = useAPIClass(AttributesAPI)

	useEffect(() => {
		attributesAPI.getAllAttributes().then((response) => {
			setAttributes(response.data)
			updateLoaderStatus()
		})
	}, [])

	function sendForm() {
		attributesAPI.setCoordinatorAttributes(checkBoxData)
	}

	return (
		<LoaderComponent loaderStatus={loaderStatus}>
			<div>
				<Layout>
					<div className="settings_attribute_container">
						<SettingsAttributeWithDataForm
							sendFormCheckBox={sendForm}
							setValue={setAttributes}
							children={"Добавить"}
						/>
						<CheckboxAttributeList dataList={attributes} setValue={setCheckBoxData} />
					</div>
				</Layout>
			</div>
		</LoaderComponent>
	)
}

export default SettingAttribute
