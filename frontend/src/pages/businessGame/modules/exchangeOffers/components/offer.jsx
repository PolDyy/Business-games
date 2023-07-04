import React from "react"
import "../styles/offer.scss"

function Offer({
	id,
	title,
	subtitle,
	cost,
	count,
	acceptOffer,
	declineOffer,
	firstBtn,
	secondBtn,
	...props
}) {
	return (
		<div className={"offer"}>
			<div className="offer_container">
				<p className="offer_container__title">{title}</p>
				<span className="offer_container__subtitle">{subtitle}</span>
			</div>
			<div className="offer_info_container">
				<p className="offer_info_container__cost">{cost}</p>
				<p className="offer_info_container__count">{count}</p>
			</div>
			<div className="offer_button_container">
				<button
					onClick={() => acceptOffer()}
					className="offer_button_container__btn_offer_accept btn_reset"
				>
					{firstBtn}
				</button>
				<button
					onClick={() => declineOffer()}
					className="offer_button_container__btn_offer_reject btn_reset"
				>
					{secondBtn}
				</button>
			</div>
		</div>
	)
}

export default Offer
