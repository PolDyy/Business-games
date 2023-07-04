import React from "react"
import "../styles/outgoingMessage.jsx.scss"
import { useEffect } from "react"

function OutgoingMessage({ message, time, ...props }) {
	useEffect(() => {
		const chat = document.getElementById("chat")
		chat.scrollTop = chat.scrollHeight
	}, [])

	return (
		<div className="chat__right_textarea">
			<div className={"outgoing_message"}>
				<div className="incoming_message__container">
					<p className="incoming_message__container_message">{message}</p>
					<p className="incoming_message__container_time">{time}</p>
				</div>
			</div>
		</div>
	)
}

export default OutgoingMessage
