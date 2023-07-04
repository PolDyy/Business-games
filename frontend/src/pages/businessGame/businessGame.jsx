import React, { useState } from "react"
import InteractionMinister from "./modules/interactionMinister/interactionMinister"
import "./businessGame.scss"
import PlayerRole from "./modules/playerRole/playerRole"
import DiplomaAndLicense from "./modules/diploma_and_license/diplomaAndLicense"
import PlayersFunction from "./modules/playersFunction/playersFunction"
import ExchangeOffers from "./modules/exchangeOffers/exchangeOffers"
import Credit from "./modules/credit/credit"
import CreateOffer from "./modules/createOffer/createOffer"
import Resources from "./modules/resources/resources"
import { PlayerActions } from "./websocketApi/playerActions"
import PlayerLobby from "./modules/lobby/playerLobby/playerLobby"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { NoticeService } from "../../services/noticeService"
import LayoutGame from "../../components/layouts/layoutGame"
import Chat from "./modules/chat/chat"
import { useChangeDisplay } from "./hooks/hooks"
import Loader from "../loader/loader"
import createNoticeWebsocket from "./utils"

function BusinessGame({ code }) {
	function updateChat(data) {
		dispatch({
			type: "UPDATE_CHAT",
			payload: {
				data,
			},
		})
	}

	// Функциональные переменные
	const [userID, setUserID] = useState()

	// Глобальные переменные игры

	const [gameStatus, setGameStatus] = useState("loader")
	const [gameName, setGameName] = useState("")
	const [timeStart, setTimeStart] = useState({
		date: "00/00/00",
		time: "00:00",
	})
	const [role, setRole] = useState("")

	// Чат
	const [chatDisplay, changeChatDisplay] = useChangeDisplay(false)

	function checkGameStatusForChat() {
		if (gameStatus !== "lobby") {
			changeChatDisplay()
		} else {
			noticeService.addErrorNotice("Чат в данный момент не доступен.")
		}
	}

	// Переменные игры

	const [treasure, setTreasure] = useState(0)

	// Общая роль
	const [banks, setBanks] = useState([])
	const [diplomasAndLicenses, setDiplomasAndLicenses] = useState([])
	const [gameRoleData, setGameRoleData] = useState()
	const [playerLobby, setPlayerLobby] = useState([])
	const [possibilities, setPossibilities] = useState([])
	const [smi, setSmi] = useState([])
	const [tax, setTax] = useState(0)
	const [users, setUsers] = useState([])

	// Банк
	const [bankMoney, setBankMoney] = useState(0)
	const [bankSalary, setBankSalary] = useState(0)

	// Ресурсы игры
	const [trades, setTrades] = useState({
		incoming: {},
		outgoing: {},
		closed: {},
	})

	const [credit, setCredits] = useState({
		accepted: {},
	})

	const [resources, setResources] = useState({
		money: 0,
		advertisements: 0,
		glass: 0,
		wood: 0,
		brick: 0,
		shingles: 0,
		small_house: 0,
		big_house: 0,
		tap: 0,
		communications: 0,
		plan_of_small_house: 0,
		plan_of_big_house: 0,
		small_area: 0,
		big_area: 0,
	})

	const dispatch = useDispatch()
	const accessToken = localStorage.getItem("accessToken")
	const websocket = useRef()

	const noticeService = new NoticeService(dispatch)

	if (!websocket.current) {
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
			noticeService.addErrorNotice("Что-то пошло не так.")
		}

		websocket.current.onmessage = function (event) {
			const data = JSON.parse(event.data)

			actions.onMessageActions.actionManager(data)

			createNoticeWebsocket(data.notice, noticeService)

			if (data.resources) {
				setResources(data.resources)
			}
			if (data.possibilities) {
				setPossibilities(data.possibilities)
			}
		}
	}

	const actions = new PlayerActions(websocket.current, {
		setTrades,
		setCredits,
		setGameStatus,
		setRole,
		setTimeStart,
		setUsers,
		setBanks,
		setSmi,
		setTax,
		setPossibilities,
		setDiplomasAndLicenses,
		setGameRoleData,
		setPlayerLobby,
		updateChat,
		setUserID,
		setGameName,
		setTreasure,
		setBankMoney,
		setBankSalary,
	})

	let child = <></>

	switch (gameStatus) {
		case "loader":
			return <Loader />
		case "lobby":
			child = <PlayerLobby timeStart={timeStart} />
			break
		case "in_process":
			child = (
				<div className="business_game">
					<PlayerRole
						role={role}
						bankSalary={bankSalary}
						bankMoney={bankMoney}
						treasure={treasure}
						roleData={gameRoleData}
						actions={actions}
					/>
					<PlayersFunction
						possibilities={possibilities}
						baseRoleActions={actions.baseRoleActions}
					/>
					<Resources resources={resources} />
					<DiplomaAndLicense diplomasAndLicenses={diplomasAndLicenses} />
					<ExchangeOffers trades={trades} tradeActions={actions.tradeActions} />
					<Credit credits={credit} creditActions={actions.creditActions} />
					<InteractionMinister
						tradeWithMinistersActions={actions.tradeWithMinistersActions}
						tax={tax}
					/>
					<CreateOffer
						actions={actions}
						users={users}
						banks={banks}
						smi={smi}
						tax={tax}
					/>
				</div>
			)
			break
	}

	return (
		<LayoutGame
			chatDisplay={chatDisplay}
			changeChatDisplay={checkGameStatusForChat}
			gameName={gameName}
			gameStatus={gameStatus}
		>
			{chatDisplay ? (
				<Chat players={playerLobby} actions={actions.chatActions} userID={userID} />
			) : (
				child
			)}
		</LayoutGame>
	)
}

export default BusinessGame
