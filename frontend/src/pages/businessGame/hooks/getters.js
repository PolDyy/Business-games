import Offer from "../modules/exchangeOffers/components/offer"

export function getOffers(data, accept, decline) {
	const trades = []

	if (data) {
		for (const item in data) {
			const trade = data[item]
			trades.push(
				<Offer
					acceptOffer={() => {
						accept(item)
					}}
					declineOffer={() => {
						decline(item)
					}}
					title={trade.resource}
					subtitle={"от " + trade.seller}
					cost={trade.price_per_one + " p"}
					count={trade.quantity + " шт"}
					key={item}
					firstBtn={"Принять"}
					secondBtn={"Отклонить"}
				/>
			)
		}
	}
	return trades
}

export function getOffersCredit(data, actions) {
	const trades = []
	if (data) {
		for (const item in data) {
			const trade = data[item]
			trades.push(
				<Offer
					acceptOffer={() => {
						actions.acceptCreditOffer({ item_id: item })
					}}
					declineOffer={() => {
						actions.declineCreditOffer({ item_id: item })
					}}
					title={"Кредит"}
					subtitle={"от " + trade.player}
					cost={trade.money + " p"}
					count={trade.percent + " %"}
					key={item}
					firstBtn={"Принять"}
					secondBtn={"Отклонить"}
				/>
			)
		}
	}
	return trades
}

export function getOffersActiveCredit(data, actions) {
	const trades = []
	if (data) {
		for (const item in data) {
			const trade = data[item]
			trades.push(
				<Offer
					acceptOffer={() => {}}
					declineOffer={() => {
						actions.takeMoneyFromUser({ item_id: item })
					}}
					title={"Кредит"}
					subtitle={"от " + trade.player}
					cost={trade.money + " p"}
					count={trade.percent + " %"}
					key={item}
					firstBtn={"Вы"}
					secondBtn={"Потребовать возврат долга"}
				/>
			)
		}
	}
	return trades
}
