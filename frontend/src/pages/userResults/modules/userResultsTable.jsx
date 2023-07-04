import React from "react"
import "../styles/userResultsTable.scss"
import UserResultsTableHeaderList from "./userResultsTableHeaderList"
import UserResultsTableColList from "./userResultsTableColList"

function UserResultsTable(props) {
	return (
		<table className={"user_results__table"}>
			<thead>
				<UserResultsTableHeaderList />
			</thead>
			<tbody>
				<UserResultsTableColList />
				<UserResultsTableColList />
				<UserResultsTableColList />
				<UserResultsTableColList />
				<UserResultsTableColList />
				<UserResultsTableColList />
			</tbody>
		</table>
	)
}

export default UserResultsTable
