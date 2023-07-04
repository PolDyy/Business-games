import { useState } from "react"
import Loader from "../pages/loader/loader"
import React from "react"

export function useLoader() {
	const [loaderStatus, setLoaderStatus] = useState(false)

	function updateLoaderStatus() {
		setLoaderStatus(true)
	}

	return [loaderStatus, updateLoaderStatus]
}

export function LoaderComponent({ loaderStatus, children }) {
	return <>{loaderStatus ? children : <Loader />}</>
}
