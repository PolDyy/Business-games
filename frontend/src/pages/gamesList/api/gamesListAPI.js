import { getAxiosInstanceAuth } from "../../../actions/axios_config"
import { checkErrors, NoticeApiBase } from "../../../utilits/baseApiClasses"

export class GamesListAPI extends NoticeApiBase {
	async getGamesPerPage(page) {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("api/player/games/" + page)
			.then((response) => {
				return response.data
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}
}
