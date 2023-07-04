import React from "react"
import "../styles/userGameListTable.scss"
import UserGameListTableColList from "./userGameListTableColList"
import UserGameListTableHeaderList from "./userGameListTableHeaderList"

function UserGameListTable({ value }) {
	return (
		<table className={"user_game_list_table"}>
			<thead>
				<UserGameListTableHeaderList />
			</thead>
			<tbody>
				{value.map((game) => {
					return (
						<UserGameListTableColList
							name={game.name}
							role={game.role}
							totalPLayers={game.number_players}
							years={game.year}
							endDate={game.end_date}
						/>
					)
				})}
			</tbody>
		</table>
	)
}

export default UserGameListTable
