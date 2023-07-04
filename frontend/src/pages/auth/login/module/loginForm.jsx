import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Input from "../../../../components/UI-UX/input"
import HelpText from "../../../../components/UI-UX/help_text"
import Button from "../../../../components/UI-UX/button"
import Authentication from "./../../api/authorization"
import { useNavigate } from "react-router-dom"
import { urls } from "../../../../urls"
import { useAPIClass } from "../../../../utilits/baseApiClasses"

function LoginForm() {
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const authAPI = useAPIClass(Authentication)

	function login() {
		authAPI.login(email, password).then((response) => {
			if (response.status === 200) {
				const role = response.data.role
				if (role === "Player") {
					navigate(urls.profilePlayer)
				}
				if (role === "Coordinator") {
					navigate(urls.profileCoordinator)
				}
			}
		})
	}

	return (
		<form className={"auth_form"}>
			<div className="form_auth-inputs form_auth-input-login">
				<Input
					type="email"
					placeholder="Почта"
					value={email}
					setValue={setEmail}
					image="email"
				/>
				<Input
					type="password"
					placeholder="Пароль"
					value={password}
					setValue={setPassword}
					image="password"
				/>
			</div>
			<div className="container_login_right">
				<HelpText link={"/recoveryPassword"} text={"Забыли пароль?"} />
			</div>
			<div className="button_container">
				<Button action={() => login()} children="Войти" />
			</div>
		</form>
	)
}

export default LoginForm
