import React, { useEffect } from "react"
import Authentication from "./api/authorization"
import { useNavigate } from "react-router-dom"
import { urls } from "../../urls"
import { useAPIClass } from "../../utilits/baseApiClasses"

function TokensCheck() {
	const navigate = useNavigate()

	const authAPI = useAPIClass(Authentication)

	function redirectLogin() {
		navigate(urls.login)
	}

	const refreshAccessToken = () => {
		authAPI.refreshToken(redirectLogin)
	}

	useEffect(() => {
		authAPI.refreshToken(redirectLogin)
		setInterval(refreshAccessToken, 1000 * 90)
	}, [])

	return <></>
}

export default TokensCheck
