import React from "react"
import "./styles/grayContainer.scss"

function GrayContainer({ children, ...props }) {
	return <div className={"gray_container"}>{children}</div>
}

export default GrayContainer
