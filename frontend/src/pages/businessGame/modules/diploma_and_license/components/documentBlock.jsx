import React from "react"
import "../styles/documentBlock.scss"

function DocumentBlock({ title, timing, style, ...props }) {
	return (
		<div className={"document_block"}>
			<p className="document_block_title">{title}</p>
			<p className="document_timing">{timing}</p>
		</div>
	)
}

export default DocumentBlock
