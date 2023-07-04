import React from "react"
import IncomingMessage from "./incomingMessage"
import OutgoingMessage from "./outgoingMessage"
import ChatTextArea from "./chatTextArea"

function RightChat({ actions, currentChat, userID, currentChatID }) {
	console.log(userID)

	return (
		<div id={"chat"} className="chat__right">
			{currentChat ? (
				<>
					{currentChat.map((message, index) => {
						if (message.user.user_id !== userID) {
							return (
								<IncomingMessage
									key={index}
									name={message.user.name}
									message={message.message}
									time={message.time}
								/>
							)
						} else {
							return (
								<OutgoingMessage
									key={index}
									name={message.user.name}
									message={message.message}
									time={message.time}
								/>
							)
						}
					})}
				</>
			) : (
				<></>
			)}
			<div className="chat__enter_message">
				<ChatTextArea currentChatID={currentChatID} actions={actions} />
			</div>
		</div>
	)
}

export default RightChat
