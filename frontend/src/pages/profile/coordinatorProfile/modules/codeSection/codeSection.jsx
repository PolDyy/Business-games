import React, { useEffect, useState } from "react"
import "../components/coordinatorComponentsStyle/coordinatorCodeSection.scss"
import CoordinatorCode from "../components/coordinatorCode"
import CoordinatorUrl from "../components/coordinatorUrl"

function CodeSection({ updateCode, url, code }) {
	return (
		<div className={"coordinator_code_section_fill"}>
			<CoordinatorCode code={code} update={updateCode} />
			<CoordinatorUrl url={url} />
		</div>
	)
}

export default CodeSection
