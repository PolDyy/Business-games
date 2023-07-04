import React, { useEffect } from "react"
import "./styles/credit.scss"
import TitleForGame from "../../components/titleForGame"
import GrayContainer from "../../components/grayContainer"
import OffersList from "../exchangeOffers/components/offersList"
import { useState } from "react"
import CreditItem from "./components/creditItem"
import { useChangeDisplay } from "../../hooks/hooks"

function Credit({ credits, creditActions, banks }) {
	const [display, changeDisplay] = useChangeDisplay()

	const [displayedItems, setDisplayedItems] = useState([])
	console.log(credits)
	function getCreditComponents() {
		const new_offers = []
		for (const item in displayedItems) {
			const credit = displayedItems[item]
			new_offers.push(
				<CreditItem
					key={item}
					itemId={item}
					makePay={(data) => creditActions.makeCreditPay(data)}
					title={credit.bank}
					cost={credit.money + " р"}
				/>
			)
		}
		return new_offers
	}

	useEffect(() => {
		setDisplayedItems(credits)
	}, [credits])

	return (
		<div className={"credit_container"}>
			<TitleForGame onclick={changeDisplay} title={"Кредиты"} />
			{display ? (
				<>
					<div className="credit_container__content">
						<GrayContainer>
							<OffersList
								emptyText={"У вас нет активных кредитов."}
								offers={getCreditComponents()}
							/>
						</GrayContainer>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default Credit
