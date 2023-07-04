import React from "react"
import { useCheckCoordinator, useCheckPLayer } from "../permissions"
import BusinessGame from "./businessGame"
import CoordinatorGame from "./coordinatorGame"
import { useParams } from "react-router-dom"

function Game() {
	const { code } = useParams()

	let children = <></>

	if (useCheckPLayer()) {
		children = <BusinessGame code={code} />
	}

	if (useCheckCoordinator()) {
		children = <CoordinatorGame code={code} />
	}

	return <>{children}</>
}

export default Game
