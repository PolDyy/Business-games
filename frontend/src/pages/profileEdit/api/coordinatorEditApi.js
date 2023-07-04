import { getAxiosInstanceAuth } from "../../../actions/axios_config"
import { checkErrors, NoticeApiBase } from "../../../utilits/baseApiClasses"

export class CoordinatorEditApi extends NoticeApiBase {
	sendForm(data) {
		const axios = getAxiosInstanceAuth()
		axios
			.post("api/coordinator/retrieve", { ...data })
			.then((response) => {
				this.createNoticeSuccess("Данные успешно обновлены")
			})
			.catch((response) => {
				checkErrors(this.dispatch, response, this.navigate)
				const errors = response.response.data.errors
				this.createNoticeError(errors)
			})
	}
}
