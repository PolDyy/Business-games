import React from "react"
import "./styles/userGameList.scss"
import Layout from "../../../components/layouts/layout"
import UserGameListTable from "./modules/userGameListTable"
import Pagination from "../../../components/paginator/pagination"
import { useState } from "react"
import { GamesListAPI } from "../api/gamesListAPI"

function UserGameList(props) {
	const [data, setData] = useState([])

	function getGamesPerPage(page) {
		return GamesListAPI.getGamesPerPage(page)
	}

	return (
		<div>
			<Layout>
				<div className="user_game_list">
					<UserGameListTable value={data} />
					<Pagination callback={getGamesPerPage} setValue={setData} />
				</div>
			</Layout>
		</div>
	)
}

export default UserGameList
