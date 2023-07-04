import React from "react"
import BaseContainer from "./baseComponents/BaseContainer"
import HeaderWithChat from "./baseComponents/headerWithChat"

function LayoutGame({ children, chatDisplay, changeChatDisplay, gameName }) {
	return (
		<>
			<HeaderWithChat
				chatDisplay={chatDisplay}
				changeChatDisplay={changeChatDisplay}
				capacity={false}
				gameName={gameName}
			/>
			<BaseContainer>{children}</BaseContainer>
		</>
	)
}

export default LayoutGame
