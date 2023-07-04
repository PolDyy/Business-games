import React, { useEffect, useState } from "react"
import "./styles/exchangeOffers.scss"
import TitleForGame from "../../components/titleForGame"
import OffersButtonList from "./components/offersButtonList"
import OffersList from "./components/offersList"
import GrayContainer from "../../components/grayContainer"
import Offer from "./components/offer"
import CloseOffer from "./components/closeOffer"
import OutgoingOffer from "./components/outgoingOffer"
import { useChangeDisplay } from "../../hooks/hooks"

function ExchangeOffers({ trades, tradeActions, ...props }) {
	const [display, changeDisplay] = useChangeDisplay()

	const [displayedTrades, setDisplayedTrades] = useState("incoming")
	const [displayedItems, setDisplayedItems] = useState([])

	function getOffers() {
		const new_offers = []
		if (displayedTrades === "incoming") {
			for (const item in displayedItems) {
				const trade = displayedItems[item]
				new_offers.push(
					<Offer
						acceptOffer={() => {
							tradeActions.acceptTrade(item)
						}}
						declineOffer={() => {
							tradeActions.closeTrade(item)
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
		if (displayedTrades === "outgoing") {
			for (const item in displayedItems) {
				const trade = displayedItems[item]
				new_offers.push(
					<OutgoingOffer
						declineOffer={() => {
							tradeActions.closeTrade(item)
						}}
						title={trade.resource}
						subtitle={"от " + trade.seller}
						cost={trade.price_per_one + " p"}
						count={trade.quantity + " шт"}
						key={item}
						firstBtn={"Отклонить"}
						secondBtn={"Ожидает подтверждения"}
					/>
				)
			}
		}

		if (displayedTrades === "closed") {
			for (const item in displayedItems) {
				const trade = displayedItems[item]
				new_offers.push(
					<CloseOffer
						title={trade.resource}
						subtitle={"от " + trade.seller}
						cost={trade.price_per_one + " p"}
						count={trade.quantity + " шт"}
						key={item}
						status={trade.status}
					/>
				)
			}
		}
		return new_offers
	}

	useEffect(() => {
		switch (displayedTrades) {
			case "incoming":
				setDisplayedItems(trades.incoming)
				break
			case "closed":
				setDisplayedItems(trades.closed)
				break
			case "outgoing":
				setDisplayedItems(trades.outgoing)
				break
		}
	}, [trades, displayedTrades])

	return (
		<div className={"exchange_offers_container"}>
			<TitleForGame onclick={changeDisplay} title={"Предложения обмена"} />
			{display ? (
				<div className="exchange_offers_container__content">
					<OffersButtonList
						incoming={Object.keys(trades.incoming).length}
						outgoing={Object.keys(trades.outgoing).length}
						closed={Object.keys(trades.closed).length}
						setIncoming={() => {
							setDisplayedTrades("incoming")
						}}
						setOutgoing={() => {
							setDisplayedTrades("outgoing")
						}}
						setClosed={() => {
							setDisplayedTrades("closed")
						}}
					/>
					<GrayContainer>
						<OffersList
							emptyText={"У вас нет предложений обмена."}
							offers={getOffers()}
						/>
					</GrayContainer>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default ExchangeOffers
