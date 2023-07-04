import React from "react"
import { useEffect, useState } from "react"
import CoordinatorWithOutData from "./coordinatorProfile/modules/CoordinatorWithOutData/coordinatorWithOutData"
import CoordinatorWithData from "./coordinatorProfile/modules/coordinatorWithData/coordinatorWithData"
import { CoordinatorInfo } from "./api/coordinatorProfileApi"
import { useAPIClass } from "../../utilits/baseApiClasses"
import { LoaderComponent, useLoader } from "../../hooks/hooks"

function CoordinatorProfile() {
	const [data, setData] = useState([])

	const [loaderStatus, updateLoaderStatus] = useLoader()

	function getData(data) {
		const company = data.company
		const jobTitle = data.job_title
		const birthday = data.birthday
		const phoneNumber = data.phone_number

		if (!company || !jobTitle || !birthday || !phoneNumber) {
			return false
		} else {
			const data = [
				{ attribute: "Компания", value: company },
				{ attribute: "Должность", value: jobTitle },
				{ attribute: "Дата рождения", value: birthday },
				{ attribute: "Телефон", value: phoneNumber },
			]
			setData(data)
		}
	}

	const coordinatorInfo = useAPIClass(CoordinatorInfo)

	const without_data = <CoordinatorWithOutData />

	const with_data = <CoordinatorWithData data={data} />

	useEffect(() => {
		coordinatorInfo.getCoordinatorInfo().then((response) => {
			getData(response.data)
			updateLoaderStatus()
		})
	}, [])

	return (
		<LoaderComponent loaderStatus={loaderStatus}>
			{data.length !== 0 ? with_data : without_data}
		</LoaderComponent>
	)
}

export default CoordinatorProfile
