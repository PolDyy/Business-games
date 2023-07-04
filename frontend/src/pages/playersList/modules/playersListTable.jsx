import React from "react"
import "../styles/playersListTable.scss"
import PlayersListTableHeaderList from "./playersListTableHeaderList"
import PlayersListTableColList from "./playersListTableColList"

function PlayersListTable({ value, ...props }) {
	return (
		<table className={"players_list_table"}>
			<thead>
				<PlayersListTableHeaderList />
			</thead>
			<tbody>
				{value.map((player) => {
					return (
						<PlayersListTableColList
							firstName={player.first_name}
							secondName={player.last_name}
							email={player.email}
							games={player.games}
							createdAt={player.register_date}
						/>
					)
				})}
			</tbody>
		</table>
	)
}

export default PlayersListTable
