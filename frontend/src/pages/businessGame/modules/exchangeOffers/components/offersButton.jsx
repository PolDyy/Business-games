import React from "react"
import "../styles/offersButton.scss"

function OffersButton({ children, count, onclick, ...props }) {
	return (
		<button onClick={onclick} className={"offers_button btn_reset"}>
			{children}
			<div className="count_offers">{count}</div>
		</button>
	)
}

export default OffersButton
