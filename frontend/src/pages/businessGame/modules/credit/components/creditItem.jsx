import React, { useState } from "react"
import "../styles/creditItem.scss"

function CreditItem({ title, cost, itemId, makePay, ...props }) {
	const [money, setMoney] = useState(0)

	function getData() {
		return {
			item_id: itemId,
			money: money,
		}
	}

	return (
		<div className={"credit_item"}>
			<p className="credit_item__title">{title}</p>
			<p className="credit_item__cost">{cost}</p>
			<input
				value={money}
				onChange={(event) => {
					setMoney(event.target.value)
				}}
				type="number"
				placeholder={"Введите сумму погашения"}
				className="credit_item__input"
			/>
			<button onClick={() => makePay(getData())} className="credit_item__btn">
				Погасить долг
			</button>
		</div>
	)
}

export default CreditItem
