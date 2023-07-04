import React from "react"
import "../styles/creditList.scss"
import CreditItem from "./creditItem"
import PaginationBS from "../../../components/paginatorBs/paginatorBS"

function CreditList({ credits }) {
	return (
		<div className={"credit_list"}>
			<CreditItem title={"МВД"} cost={"1000 р"} />
			<CreditItem title={"МВД"} cost={"1000 р"} />
			<PaginationBS />
		</div>
	)
}

export default CreditList
