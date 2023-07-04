import React from "react"
import "../styles/bankAccount.scss"

function BankAccount({ text, value, ...props }) {
	return (
		<div className={"bank_account"}>
			<p className="bank_account__item">{text}:</p>
			<p className="bank_account__item">{value}</p>
		</div>
	)
}

export default BankAccount
