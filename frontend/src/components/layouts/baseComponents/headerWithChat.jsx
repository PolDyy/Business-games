import React from "react"
import "../styles/header.scss"
import BurgerMenu from "../../UI-UX/burger_menu"

function HeaderWithChat({ capacity = true, chatDisplay, changeChatDisplay, gameName }) {
	let headerColorClassName = ""

	if (!capacity) {
		headerColorClassName = "header_purple"
	}

	return (
		<header className={"header " + headerColorClassName}>
			<div className="header_container">
				<BurgerMenu />
				<div className={"header_container__game"}>
					<div className={"header_container__game_title"}>{gameName}</div>
					{!chatDisplay ? (
						<div
							onClick={changeChatDisplay}
							className={"header_container__game_chat"}
						></div>
					) : (
						<div
							onClick={changeChatDisplay}
							className={"header_container__game_back"}
						></div>
					)}
				</div>
			</div>
		</header>
	)
}

export default HeaderWithChat
