export class BaseActions {
	constructor(ws) {
		this.ws = ws
	}

	sendActions(action, data = {}) {
		console.log(data)
		this.ws.send(
			JSON.stringify({
				action: action,
				data: {
					...data,
				},
			})
		)
	}
}
