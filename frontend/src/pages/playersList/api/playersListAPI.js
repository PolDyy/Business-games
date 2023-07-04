import { getAxiosInstanceAuth } from "../../../actions/axios_config"
import { checkErrors, NoticeApiBase } from "../../../utilits/baseApiClasses"

export class PlayersListAPI extends NoticeApiBase {
	async getPlayersPerPage(page) {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("api/coordinator/players/" + page)
			.then((response) => {
				return response.data
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}
}
