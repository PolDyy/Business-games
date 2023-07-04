import React from "react"
import "./applications.scss"

function Empty({ text, ...props }) {
	return (
		<div className="applications_content">
			<p className="application_hint">{text}</p>
		</div>
	)
}

export default Empty
