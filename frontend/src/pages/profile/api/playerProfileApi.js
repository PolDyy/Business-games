import { getAxiosInstanceAuth } from "../../../actions/axios_config"
import { checkErrors, NoticeApiBase } from "../../../utilits/baseApiClasses"

export class PlayerInfo extends NoticeApiBase {
	async getPlayerInfo() {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("api/player/retrieve")
			.then((response) => {
				if (response.status === 200) {
					this.dispatch({
						type: "SET_PLAYER",
						payload: response.data,
					})
				}
				return response
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}

	async getData() {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("/api/player/attributes/value")
			.then((response) => {
				this.dispatch({
					type: "SET_PLAYER_ATTRIBUTES",
					payload: response.data,
				})
				console.log(response.data)
				return response
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}
}
