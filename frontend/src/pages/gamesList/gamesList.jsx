import React from "react"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import UserConnectGame from "./userConnectGame/userConnectGame"
import UserGameList from "./userGameList/userGameList"

function GamesList(props) {
	const dispatch = useDispatch()

	function getData() {}

	useEffect(() => {
		getData()
	}, [])

	const [data, setData] = useState([])

	const without_data = <UserConnectGame />

	const with_data = <UserGameList data={data} />

	return <>{data !== [] ? without_data : with_data}</>
}

export default GamesList
