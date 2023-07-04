import React from "react"
import "../styles/outgoingOffer.scss"

function OutgoingOffer({
	title,
	subtitle,
	cost,
	count,
	firstBtn,
	secondBtn,
	declineOffer,
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
					onClick={() => declineOffer()}
					className="offer_button_container__btn_offer_accept btn_reset"
				>
					{firstBtn}
				</button>
				<button className="offer_button_container__btn_offer_reject btn_reset">
					{secondBtn}
				</button>
			</div>
		</div>
	)
}

export default OutgoingOffer
