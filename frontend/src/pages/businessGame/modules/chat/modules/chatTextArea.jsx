import React, { useState } from "react"
import "../styles/chatTextArea.scss"
import GrayContainer from "../../../components/grayContainer"

function ChatTextArea({ actions, currentChatID, ...props }) {
	const [message, setMessage] = useState("")

	function sendMessage() {
		if (message) {
			const data = {
				user_id: currentChatID,
				message: message,
			}
			if (currentChatID === "allChat") {
				actions.gameChatSendMessage(data)
			} else {
				actions.sendPrivateMessage(data)
			}
			setMessage("")
		}
	}

	return (
		<GrayContainer>
			<div className="chat_text_area">
				<textarea
					placeholder={"Введите сообщение"}
					className={"chat_text_area__text"}
					value={message}
					onChange={(event) => {
						setMessage(event.target.value)
					}}
				>
					{message}
				</textarea>
				<button
					onClick={(event) => {
						event.preventDefault()
						sendMessage()
					}}
					className="chat_text_area__btn_send btn_reset"
				></button>
			</div>
		</GrayContainer>
	)
}

export default ChatTextArea
