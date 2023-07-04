import React, { useEffect } from "react"
import "../styles/incomingMessage.scss"

function IncomingMessage({ name, message, time, ...props }) {
	useEffect(() => {
		const chat = document.getElementById("chat")
		chat.scrollTop = chat.scrollHeight
	}, [])

	return (
		<div className={"incoming_message"}>
			<p className="incoming_message__name">{name}</p>
			<div className="incoming_message__container">
				<p className="incoming_message__container_message">{message}</p>
				<p className="incoming_message__container_time">{time}</p>
			</div>
		</div>
	)
}

export default IncomingMessage
