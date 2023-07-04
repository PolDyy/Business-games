import { NoticeService } from "../services/noticeService"
import { getAxiosInstanceAuth } from "../actions/axios_config"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export class NoticeApiBase {
	constructor(dispatch, navigate) {
		this.dispatch = dispatch
		this.navigate = navigate
	}
	createNoticeSuccess(message) {
		return new NoticeService(this.dispatch).addInfoNotice(message)
	}

	createNoticeError(errors) {
		errors.map((message, index) => {
			return new NoticeService(this.dispatch).addErrorNotice(message)
		})
	}
}

export class ChangePassword extends NoticeApiBase {
	changePassword(data) {
		const axios = getAxiosInstanceAuth()
		return axios
			.post("api/change-password", data)
			.then((response) => {
				this.createNoticeSuccess("Данные успешно обновлены")
			})
			.catch((response) => {
				checkErrors(this.dispatch, response, this.navigate)
			})
	}
}

export function useAPIClass(apiClass) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	return new apiClass(dispatch, navigate)
}

export function checkErrors(dispatch, reason, navigate) {
	const statusCode = reason.response.status
	if (statusCode === 404) {
		navigate("/404")
	}
	if (statusCode === 403) {
		console.log(403)
		navigate("/403")
	}
	if (statusCode === 400) {
		const errors = reason.response.data.errors
		return errors
	}
	if (statusCode > 500) {
		navigate("/500")
	}
}
