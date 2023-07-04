import React from "react"
import "./styles/userResults.scss"
import Layout from "../../components/layouts/layout"
import UserResultsTable from "./modules/userResultsTable"
import Pagination from "../../components/paginator/pagination"

function UserResults(props) {
	return (
		<Layout>
			<div className="user_results">
				<UserResultsTable />
				<Pagination />
			</div>
		</Layout>
	)
}

export default UserResults
