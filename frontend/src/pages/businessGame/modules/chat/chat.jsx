import React, { useEffect, useState } from "react"
import "./styles/chat.scss"
import Layout from "../../../../components/layouts/layout"
import ChatTextArea from "./modules/chatTextArea"
import IncomingMessage from "./modules/incomingMessage"
import OutgoingMessage from "./modules/outgoingMessage"
import ChatList from "./modules/chatList"
import InputSearch from "../../../../components/UI-UX/inputSearch"
import { useSelector } from "react-redux"
import RightChat from "./modules/rightChat"

function Chat({ players, actions, userID }) {
	const chat = useSelector((state) => state.chat)
	const [currentChatID, setCurrentChatID] = useState()

	const [currentChat, setCurrentChat] = useState([])

	useEffect(() => {
		if (chat[String(currentChatID)]) {
			setCurrentChat(chat[String(currentChatID)].messages)
		} else {
			setCurrentChat([])
		}
	}, [chat, currentChatID])

	return (
		<div className="chat">
			<div className="chat__left">
				<div className="chat__left_search">{/*<InputSearch />*/}</div>
				<ChatList
					chat={chat}
					currentChatID={currentChatID}
					setChat={setCurrentChatID}
					players={players}
				/>
			</div>
			<RightChat
				userID={userID}
				actions={actions}
				currentChat={currentChat}
				currentChatID={currentChatID}
			/>
		</div>
	)
}

export default Chat
