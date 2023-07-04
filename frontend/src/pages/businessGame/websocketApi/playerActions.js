import { BaseActions } from "./baseAction"

class TradeActions extends BaseActions {
	createTrade(data) {
		this.sendActions("create_trade", data)
		console.log("Отправка обмена")
	}

	closeTrade(data) {
		this.sendActions("close_trade", data)
		console.log("Обмен отменен")
	}

	acceptTrade(data) {
		this.sendActions("accept_trade", data)
		console.log("Обмен принят")
	}
}

class TradeWithMinistersActions extends BaseActions {
	sendTradeToMvd(data) {
		this.sendActions("send_trade_to_mvd", data)
		console.log("Предложение обмена министру отправлено.")
	}

	sendTradeToJkh(data) {
		this.sendActions("send_trade_to_jkh", data)
		console.log("Предложение обмена министру отправлено.")
	}

	sendTradeToEducationMinister(data) {
		this.sendActions("send_trade_to_education_minister", data)
		console.log("Предложение обмена министру отправлено.")
	}

	sendTradeToSmi(data) {
		this.sendActions("send_trade_to_smi", data)
		console.log("Предложение обмена министру отправлено.")
	}
}

class CreditActions extends BaseActions {
	createCredit(data) {
		this.sendActions("send_credit_offer", data)
		console.log("Предложение кредита отправлено")
	}

	makeCreditPay(data) {
		this.sendActions("make_credit_pay", data)
		console.log("Сделан платеж по кредиту")
	}

	acceptCreditOffer(data) {
		this.sendActions("accept_credit_offer", data)
		console.log("Кредит одобрен")
	}

	declineCreditOffer(data) {
		this.sendActions("decline_credit_offer", data)
		console.log("Кредит отклонён")
	}

	takeMoneyFromUser(data) {
		this.sendActions("take_money_from_user", data)
		console.log("Выполнен запрос денег у игрока")
	}

	takeMoneyFromBankData(data) {
		this.sendActions("take_money_from_bank", data)
	}
}

class PresidentActions extends BaseActions {
	setWages(data) {
		this.sendActions("set_wages", data)
		console.log("Зарплаты установились.")
	}
}

class MinisterEducationsActions extends BaseActions {
	acceptDiplomaBuy(data) {
		if (data) {
			this.sendActions("accept_diploma_buy", data)
			console.log("Диплом продан.")
		}
	}

	declineDiplomaBuy(data) {
		if (data) {
			this.sendActions("decline_diploma_buy", data)
			console.log("Продажа диплома отменена.")
		}
	}
}

class SMIActions extends BaseActions {
	acceptAdvertisingBuy(data) {
		this.sendActions("accept_advertising_buy", data)
		console.log("Предложение о покупке рекламы принято")
	}

	declineAdvertisingBuy(data) {
		this.sendActions("decline_advertising_buy", data)
		console.log("Предложение о покупке рекламы отклонено")
	}
}

class MinisterMVDActions extends BaseActions {
	setLicensesLifeTime(data) {
		this.sendActions("set_licenses_life_time", data)
		console.log("Установленны сроки жизни лицензий.")
	}

	acceptMvdTrade(data) {
		this.sendActions("accept_mvd_trade", data)
		console.log("Принято предложение обмена ресурсами.")
	}

	closeMvdTrade(data) {
		this.sendActions("close_mvd_trade", data)
		console.log("Отклонено предложение обмена ресурсами.")
	}
}

class MinisterEconomy extends BaseActions {
	setControlledPrices(data) {
		this.sendActions("set_controlled_prices", data)
		console.log("Продажа диплома отменена.")
	}
}

class MinisterJKH extends BaseActions {
	acceptLicenseBuy(data) {
		this.sendActions("accept_license_buy", data)
		console.log("Покупка лицензии принята.")
	}

	declineLicenseBuy(data) {
		this.sendActions("decline_license_buy", data)
		console.log("Покупка лицензии отклонена.")
	}
}

class BaseRoleActions extends BaseActions {
	getResourceByLicense(data) {
		this.sendActions("get_resource_by_license", data)
		console.log("Получены ресурсы")
	}

	getHousePlan(data) {
		this.sendActions("get_house_plan", data)
		console.log("Получен план дома")
	}

	buildHouse(data) {
		this.sendActions("build_house", data)
		console.log("Построен дом")
	}
}

class OnMessageActions {
	constructor(setters) {
		this.setters = setters
	}

	actionManager(websocketData) {
		const data = websocketData.data
		this.setInitialGame(data)
	}

	inputDataToOption(players) {
		const options = []
		for (const playerID in players) {
			options.push({
				option: players[playerID],
				value: playerID,
			})
		}
		return options
	}

	setInitialGame(data) {
		if (data.game_status) {
			this.setters.setGameStatus(data.game_status)
		}
		if (data.time_start) {
			this.setters.setTimeStart(data.time_start)
		}
		if (data.players) {
			this.setters.setPlayerLobby(data.players)
		}
		if (data.user_id) {
			this.setters.setUserID(data.user_id)
		}
		if (data.game_name) {
			this.setters.setGameName(data.game_name)
		}
		if (data.game_status) {
			this.setters.setGameStatus(data.game_status)
		}
		if (data.trades) {
			this.setters.setTrades(data.trades)
		}
		if (data.credits) {
			this.setters.setCredits(data.credits)
		}
		if (data.role) {
			this.setters.setRole(data.role)
		}
		if (data.input_data) {
			const players = data.input_data.players
			const smi = data.input_data.SMI
			const banks = data.input_data.banks
			this.setters.setUsers(this.inputDataToOption(players))
			this.setters.setBanks(this.inputDataToOption(banks))
			this.setters.setSmi(this.inputDataToOption(smi))
		}
		if (data.diploma_and_license) {
			this.setters.setDiplomasAndLicenses(data.diploma_and_license)
		}
		if (data.role_data) {
			this.setters.setGameRoleData(data.role_data)
		}
		if (data.players) {
			this.setters.setPlayerLobby(data.players)
		}
		if (data.user_id) {
			this.setters.setUserID(data.user_id)
		}
		if (data.game_name) {
			this.setters.setGameName(data.game_name)
		}
		if (data.treasury_wallet) {
			this.setters.setTreasure(data.treasury_wallet)
		}
		if (data.bank_money) {
			this.setters.setBankMoney(data.bank_money)
		}
	}

	updateTrades(data) {
		if (data) {
			this.setters.setTrades({
				incoming: data.trades.incoming,
				outgoing: data.trades.outgoing,
				closed: data.trades.closed,
			})
			console.log("Обновились трейды")
		}
	}

	updateCredits(data) {
		if (data) {
			this.setters.setCredits(data.credits.accepted)
			console.log("Обновились кредиты")
		}
	}
}

class ChatActions extends BaseActions {
	sendPrivateMessage(data) {
		this.sendActions("private_chat_send_message", data)
	}

	gameChatSendMessage(data) {
		this.sendActions("game_chat_send_message", data)
	}
}

export class PlayerActions {
	constructor(ws, setters) {
		this.ws = ws
		this.ministerJKHActions = new MinisterJKH(this.ws)
		this.ministerEconomyActions = new MinisterEconomy(this.ws)
		this.presidentActions = new PresidentActions(this.ws)
		this.ministerMVDActions = new MinisterMVDActions(this.ws)
		this.ministerEducationsActions = new MinisterEducationsActions(this.ws)
		this.smiActions = new SMIActions(this.ws)
		this.creditActions = new CreditActions(this.ws)
		this.baseRoleActions = new BaseRoleActions(this.ws)
		this.tradeActions = new TradeActions(ws)
		this.tradeWithMinistersActions = new TradeWithMinistersActions(this.ws)
		this.chatActions = new ChatActions(this.ws)
		this.onMessageActions = new OnMessageActions(setters)
	}
}
