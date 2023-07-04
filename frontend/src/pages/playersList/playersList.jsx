import React from "react"
import "./styles/playersList.scss"
import Layout from "../../components/layouts/layout"
import PlayersListTable from "./modules/playersListTable"
import { useState } from "react"
import { PlayersListAPI } from "./api/playersListAPI"
import Pagination from "../../components/paginator/pagination"
import { useAPIClass } from "../../utilits/baseApiClasses"

function PlayersList(props) {
	const [data, setData] = useState([])

	const playersAPI = useAPIClass(PlayersListAPI)

	function getPlayersPerPage(page) {
		return playersAPI.getPlayersPerPage(page).then()
	}

	return (
		<>
			<Layout>
				<div className="players_list">
					<PlayersListTable value={data} />
					<div className="players_list__pagination">
						<Pagination callback={getPlayersPerPage} setValue={setData} />
					</div>
				</div>
			</Layout>
		</>
	)
}

export default PlayersList
