import { getAxiosInstanceAuth } from "../../../actions/axios_config"
import { checkErrors, NoticeApiBase } from "../../../utilits/baseApiClasses"

export class CoordinatorInfo extends NoticeApiBase {
	async getCoordinatorInfo() {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("api/coordinator/retrieve")
			.then((response) => {
				if (response.status === 200) {
					this.dispatch({
						type: "SET_COORDINATOR",
						payload: response.data,
					})
				}
				return response
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}

	async getInviteCode() {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("api/coordinator/invite-code")
			.then((response) => {
				return response
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}

	async updateInviteCode() {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.put("api/coordinator/invite-code")
			.then((response) => {
				return response
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}
}
