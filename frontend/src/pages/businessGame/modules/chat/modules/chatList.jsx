import React from "react"
import "../styles/chatList.scss"
import ChatBlock from "./chatBlock"

function ChatList({ players, setChat, currentChatID, chat }) {
	return (
		<div className={"chat_list"}>
			<div className="chat_list__container">
				<ChatBlock
					currentChatID={currentChatID}
					changeChat={setChat}
					playerID={"allChat"}
					title={"Координатор"}
					last_message={
						chat["allChat"].messages.at(-1)
							? chat["allChat"].messages.at(-1).message
							: "Напишите первым."
					}
					time={"00:00"}
					count_ms={chat["allChat"].unread}
				/>
				<ChatBlock
					currentChatID={currentChatID}
					changeChat={setChat}
					playerID={"allChat"}
					title={"Общий чат"}
					last_message={
						chat["allChat"].messages.at(-1)
							? chat["allChat"].messages.at(-1).message
							: "Напишите первым."
					}
					time={"00:00"}
					count_ms={chat["allChat"].unread}
				/>
				<hr className={"horizontal-line"} />
				{players.map((player, index) => {
					let lastMessage
					let countMessages

					if (chat[player.id]) {
						lastMessage = chat[player.id].messages.at(-1).message
						countMessages = chat[player.id].unread
					}
					if (!lastMessage) {
						lastMessage = "Напишите первым."
					}
					return (
						<ChatBlock
							currentChatID={currentChatID}
							changeChat={setChat}
							playerID={player.id}
							key={index}
							title={player.name}
							last_message={lastMessage}
							time={"00:00"}
							count_ms={countMessages}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default ChatList
