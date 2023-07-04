import React from "react"
import "../styles/offer.scss"
import "../styles/closeOffer.scss"

function CloseOffer({ title, subtitle, cost, count, status, ...props }) {
	return (
		<div>
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
					<div className="offer_button_container__btn_offer_accept offer_button_container__btn_offer_close btn_reset">
						{status}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CloseOffer
