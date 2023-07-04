import React from "react"
import "../styles/watchActiveGameTableList.scss"
import UserGameListTableCol from "../../../../gamesList/userGameList/modules/userGameListTableCol"

function WatchActiveGameTableColList({ fullName, role, resource }) {
	return (
		<tr className={"watch_active_game_table__container"}>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableCol col={fullName} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableCol col={role} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableCol col={resource.small_house} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableCol col={resource.big_house} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableCol col={resource.money} />
			</td>
		</tr>
	)
}

export default WatchActiveGameTableColList
