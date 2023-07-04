import React, { useEffect, useMemo, useState } from "react"
import "./checkBoxAttributeList.scss"
import CheckboxAttribute from "../../pages/createGame/modules/checkboxAttribute"
import InputSearch from "../UI-UX/inputSearch"

function CheckboxAttributeList({ dataList, setValue, ...props }) {
	const [requiredAttributes, setRequiredAttributes] = useState({})

	function changeCheckedAttributes(name, value) {
		let requiredObject = requiredAttributes
		requiredObject[name] = value
		setRequiredAttributes({ ...requiredObject })
		setValue(requiredAttributes)
	}

	const [attributes, setAttributes] = useState([])

	const [keyWord, setKeyWord] = useState("")

	useEffect(() => {
		if (dataList && dataList.length !== 0) {
			if (dataList[0][2]) {
				let checkedAttributes = {}
				dataList.forEach((attribute) => {
					checkedAttributes[attribute[0]] = attribute[2]
				})
				setRequiredAttributes(checkedAttributes)
				setAttributes(dataList)
			} else {
				setAttributes(dataList)
			}
		}
	}, [dataList])

	const sortedAttributes = useMemo(() => {
		if (keyWord) {
			return attributes.filter((attribute) => attribute[1].includes(keyWord))
		}
		return attributes
	}, [attributes, keyWord])

	const with_data = (
		<div className={"checkbox_attribute_list_content"}>
			<div className="checkbox_attribute_list_content__search">
				<InputSearch value={keyWord} setValue={setKeyWord} />
			</div>
			{sortedAttributes.map((attribute, index) => {
				return (
					<CheckboxAttribute
						value={requiredAttributes[attribute[0]]}
						change={changeCheckedAttributes}
						key={index}
						attribute_id={attribute[0]}
						text={attribute[1]}
						initialState={attribute[2]}
					/>
				)
			})}
		</div>
	)

	const without_data = (
		<div className={"settings_attribute_message"}>
			<p className="settings_attribute_message__text">
				Чтобы отметить обязательные поля для игроков, вам необходимо их добавить!
			</p>
		</div>
	)

	return attributes.length === 0 ? without_data : with_data
}

export default CheckboxAttributeList
