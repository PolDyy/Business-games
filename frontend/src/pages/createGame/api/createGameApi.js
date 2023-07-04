import { getAxiosInstanceAuth } from "../../../actions/axios_config"
import { checkErrors, NoticeApiBase } from "../../../utilits/baseApiClasses"
import { urls } from "../../../urls"

export class CreateGameApi extends NoticeApiBase {
	async getCoordinatorAttributes() {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("api/coordinator/attributes")
			.then((response) => {
				return response.data
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}

	async postCreateGame(data) {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.post("api/game/start", { ...data })
			.then((response) => {
				this.navigate(urls.businessGame + "/" + response.data.game_code)
				this.createNoticeSuccess("Игра успешно создана")
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}
}
