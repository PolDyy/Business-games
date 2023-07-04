import React, { useEffect, useState } from "react"
import CoordinatorLobby from "./modules/lobby/coordinatorLobby/coordinatorLobby"
import { CoordinatorActions } from "./websocketApi/coordinatorActions"
import WatchActiveGame from "./modules/watchActiveGame/watchActiveGame"
import { useDispatch } from "react-redux"
import { useRef } from "react"
import { NoticeService } from "../../services/noticeService"
import LayoutGame from "../../components/layouts/layoutGame"
import { useChangeDisplay } from "./hooks/hooks"
import Chat from "./modules/chat/chat"
import Loader from "../loader/loader"
import createNoticeWebsocket from "./utils"
import { useNavigate } from "react-router-dom"

function CoordinatorGame({ code }) {
	const [gameName, setGameName] = useState("")

	const [chatDisplay, changeChatDisplay] = useChangeDisplay(false)

	const [userID, setUserID] = useState()

	const [gameStatus, setGameStatus] = useState("loader")

	const [timeStart, setTimeStart] = useState({
		date: "00/00/00",
		time: "00:00",
	})
	function checkGameStatusForChat() {
		if (gameStatus !== "lobby") {
			changeChatDisplay()
		} else {
			noticeService.addErrorNotice("Чат в данный момент не доступен.")
		}
	}
	const [lobbyPlayers, setLobbyPlayers] = useState([])
	const [playersData, setPlayersData] = useState([])

	const dispatch = useDispatch()
	const accessToken = localStorage.getItem("accessToken")
	const websocket = useRef()

	const noticeService = new NoticeService(dispatch)

	function updateChat(data) {
		dispatch({
			type: "UPDATE_CHAT",
			payload: {
				data,
			},
		})
	}

	const navigate = useNavigate()

	const actions = new CoordinatorActions(websocket.current, {
		setGameStatus,
		setTimeStart,
		setLobbyPlayers,
		setPlayersData,
		setUserID,
		updateChat,
		setGameName,
		navigate,
	})

	useEffect(() => {
		if (websocket.current) {
			websocket.current.close(1000)
			setGameStatus("loader")
		}

		websocket.current = new WebSocket(
			"ws://localhost:8000/ws/game/" + code + "?token=" + accessToken
		)

		websocket.current.onopen = function (event) {
			setTimeout(() => {
				const ws = event.target
				ws.send(
					JSON.stringify({
						action: "connect_to_game",
					})
				)
			}, 5000)

			noticeService.addInfoNotice("Вы успешно подключились к игре.")
		}

		websocket.current.onclose = function () {
			noticeService.addErrorNotice("Что-то пошло не так.")
		}

		websocket.current.onerror = function () {
			noticeService.addErrorNotice("Что-то пошло не так. J")
		}

		websocket.current.onmessage = function (event) {
			const data = JSON.parse(event.data)

			actions.onMessageActions.actionManager(data)

			createNoticeWebsocket(data.notice, noticeService)
		}
	}, [code])

	let child = <></>
	switch (gameStatus) {
		case "loader":
			return <Loader />
		case "lobby":
			child = (
				<CoordinatorLobby
					code={code}
					actions={actions.gameChangeActions}
					lobbyPlayers={lobbyPlayers}
					timeStart={timeStart}
				/>
			)
			break
		case "in_process":
			child = (
				<WatchActiveGame
					actions={actions.gameChangeActions}
					playersData={playersData}
					timeStart={timeStart}
				/>
			)
			break
	}

	return (
		<LayoutGame
			gameName={gameName}
			gameStatus={gameStatus}
			chatDisplay={chatDisplay}
			changeChatDisplay={checkGameStatusForChat}
		>
			{chatDisplay ? (
				<Chat players={lobbyPlayers} actions={actions.chatActions} userID={userID} />
			) : (
				child
			)}
		</LayoutGame>
	)
}

export default CoordinatorGame
