import React from "react"
import "../styles/watchActiveGameTableList.scss"
import UserGameListTableHeader from "../../../../gamesList/userGameList/modules/userGameListTableHeader"

function WatchActiveGameTableHeaderList(props) {
	return (
		<div className={"watch_active_game_table__container"}>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableHeader header={"Фамилия Имя"} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableHeader header={"Должность"} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableHeader header={"Малые дома"} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableHeader header={"Большие дома"} />
			</td>
			<td className="watch_active_game_table__container_body">
				<UserGameListTableHeader header={"Деньги"} />
			</td>
		</div>
	)
}

export default WatchActiveGameTableHeaderList
