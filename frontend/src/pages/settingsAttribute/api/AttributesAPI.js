import { checkErrors, NoticeApiBase } from "../../../utilits/baseApiClasses"
import { getAxiosInstanceAuth } from "../../../actions/axios_config"

export class AttributesAPI extends NoticeApiBase {
	async getAllAttributes() {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.get("api/coordinator/all-attributes")
			.then((response) => {
				return response
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}

	async setCoordinatorAttributes(data) {
		const axiosInstanceAuth = getAxiosInstanceAuth()

		return await axiosInstanceAuth
			.put("api/coordinator/attributes", { attributes: data })
			.then((response) => {
				this.createNoticeSuccess("Данные успешно изменены.")
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}

	async addNewAttribute(data) {
		const axiosInstanceAuth = getAxiosInstanceAuth()
		return await axiosInstanceAuth
			.post("api/coordinator/attributes", { attribute: data })
			.then((response) => {
				this.createNoticeSuccess("Аттрибут успешно добавлен.")
				return response
			})
			.catch((reason) => {
				checkErrors(this.dispatch, reason, this.navigate)
			})
	}
}
