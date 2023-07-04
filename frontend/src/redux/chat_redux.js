const defaultState = {
	allChat: {
		messages: [],
		unread: 0,
	},
}

export default function chatReducer(state = defaultState, action) {
	switch (action.type) {
		case "UPDATE_CHAT":
			const message = action.payload.data
			const chatId = message.chat
			if (state[String(chatId)]) {
				if (chatId === message.user.user_id) {
					state[String(chatId)].unread++
				}
				state[String(chatId)].messages.push(message)
			} else {
				state[String(chatId)] = {}
				if (chatId === message.user.user_id) {
					state[String(chatId)].unread = 1
				}
				state[String(chatId)].messages = [message]
			}

			return { ...state }
		case "READ_MESSAGES":
			const chatID = action.payload
			if (state[String(chatID)]) {
				state[String(chatID)].unread = 0
			}
			return { ...state }
	}
	return defaultState
}
