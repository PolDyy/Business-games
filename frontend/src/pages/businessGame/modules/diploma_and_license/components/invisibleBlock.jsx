import React from "react"
import "../styles/imvisibleBlock.scss"
import "../styles/documentBlock.scss"

function InvisibleBlock(props) {
	return (
		<div className={"document_block invisible_block"}>
			<p className="document_block_title"></p>
			<p className="document_timing"></p>
		</div>
	)
}

export default InvisibleBlock
