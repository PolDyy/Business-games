import React from "react"
import "./styles/inputGame.scss"

function InputGame({ value, setValue, placeholder, type, min, ...props }) {
	return (
		<input
			type={type}
			min={min}
			onChange={(event) => {
				setValue(event.target.value)
			}}
			value={value}
			className={"input_game"}
			placeholder={placeholder}
		></input>
	)
}

export default InputGame
