import React, { useEffect } from "react"
import "../styles/chatBlock.scss"
import { useDispatch } from "react-redux"

function ChatBlock({
	title,
	last_message,
	time,
	count_ms,
	changeChat,
	playerID,
	currentChatID,
}) {
	let extraClass = ""

	if (currentChatID === playerID) {
		extraClass = "chat_block__active"
	}

	const dispatch = useDispatch()

	return (
		<div
			onClick={(event) => {
				changeChat(playerID)
				dispatch({
					type: "READ_MESSAGES",
					payload: playerID,
				})
			}}
			className={"chat_block " + extraClass}
		>
			<div className="chat_block__body">
				<p className="chat_block__body_title">{title}</p>
				<div className="chat_block__body_message">
					<p className="chat_block__body_message_last_ms">{last_message}</p>
					<p className="chat_block__body_message_last_ms chat_block__body_message_time">
						{time}
					</p>
				</div>
			</div>
			<div className="chat_block__count_ms">
				{count_ms ? (
					<p className="chat_block__count_ms_container">{count_ms}</p>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default ChatBlock
