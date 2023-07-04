import React from "react"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import ProfileWithOutData from "./playerProfile/modules/profileWithOutData"
import ProfileWithData from "./playerProfile/modules/profileWithData"
import { PlayerInfo } from "./api/playerProfileApi"
import { useAPIClass } from "../../utilits/baseApiClasses"
import { LoaderComponent, useLoader } from "../../hooks/hooks"

function PlayerProfile() {
	const [data, setData] = useState([])

	const [loaderStatus, updateLoaderStatus] = useLoader()

	const playerInfo = useAPIClass(PlayerInfo)

	function getData() {
		playerInfo.getData().then((response) => {
			if (response.status === 200) {
				setData(response.data)
				updateLoaderStatus()
			}
		})
	}

	useEffect(() => {
		playerInfo.getPlayerInfo()
		getData()
	}, [])

	const without_data = <ProfileWithOutData />

	const with_data = <ProfileWithData data={data} />

	return (
		<LoaderComponent loaderStatus={loaderStatus}>
			{data.length !== 0 ? with_data : without_data}
		</LoaderComponent>
	)
}

export default PlayerProfile
