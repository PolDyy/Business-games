import React from "react"
import "./styles/button_purple.scss"

function ButtonPurple({ children, onclick }) {
	return (
		<button
			onClick={(event) => {
				event.preventDefault()
				onclick()
			}}
			className={"btn_reset btn_purple"}
		>
			{children}
		</button>
	)
}

export default ButtonPurple
