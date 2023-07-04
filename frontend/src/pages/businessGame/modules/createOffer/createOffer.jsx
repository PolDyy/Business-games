import React from "react"
import "./styles/createOffer.scss"
import TitleForGame from "../../components/titleForGame"
import TitleSectionGame from "../../components/titleSectionGame"
import GrayContainer from "../../components/grayContainer"
import CreateOfferDeal from "./modules/createOfferDeal"
import CreateOfferCredit from "./modules/createOfferCredit"
import CreateOfferAdvertisement from "./modules/createOfferAdvertisement"
import { useChangeDisplay } from "../../hooks/hooks"

function CreateOffer({ actions, users, banks, smi, tax }) {
	const [display, changeDisplay] = useChangeDisplay()
	const [displayTrade, changeDisplayTrade] = useChangeDisplay()
	const [displayCredit, changeDisplayCredit] = useChangeDisplay()
	const [displayAdvertisement, changeDisplayAdvertisement] = useChangeDisplay()

	return (
		<div className={"create_offer_container"}>
			<TitleForGame onclick={changeDisplay} title={"Создать обмен"} />
			{display ? (
				<div className="create_offer_container__content">
					<TitleSectionGame
						onclick={changeDisplayTrade}
						title={"Предложить сделку о покупке"}
					/>
					{displayTrade ? (
						<GrayContainer>
							<CreateOfferDeal
								tax={tax}
								users={users}
								tradeActions={actions.tradeActions}
							/>
						</GrayContainer>
					) : (
						<></>
					)}
					<TitleSectionGame onclick={changeDisplayCredit} title={"Взять кредит"} />
					{displayCredit ? (
						<GrayContainer>
							<CreateOfferCredit banks={banks} creditActions={actions.creditActions} />
						</GrayContainer>
					) : (
						<></>
					)}
					<TitleSectionGame
						onclick={changeDisplayAdvertisement}
						title={"Купить рекламу"}
					/>
					{displayAdvertisement ? (
						<GrayContainer>
							<CreateOfferAdvertisement
								tax={tax}
								smi={smi}
								tradeWithMinistersActions={actions.tradeWithMinistersActions}
							/>
						</GrayContainer>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default CreateOffer
