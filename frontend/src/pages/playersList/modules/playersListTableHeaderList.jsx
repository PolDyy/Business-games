import React from "react"
import "../styles/playersListTableHeaderList.scss"
import UserGameListTableHeader from "../../gamesList/userGameList/modules/userGameListTableHeader"

function PlayersListTableHeaderList({ header, ...props }) {
	return (
		<tr className={"players_list_table__container"}>
			<th className={"players_list_table__container_th"}>
				<UserGameListTableHeader header={"Фамилия"} />
			</th>
			<th className={"players_list_table__container_th"}>
				<UserGameListTableHeader header={"Имя"} />
			</th>
			<th className={"players_list_table__container_th"}>
				<UserGameListTableHeader header={"Почта"} />
			</th>
			<th className={"players_list_table__container_th"}>
				<UserGameListTableHeader header={"Количество игр"} />
			</th>
			<th className={"players_list_table__container_th"}>
				<UserGameListTableHeader header={"Дата регистрации"} />
			</th>
		</tr>
	)
}

export default PlayersListTableHeaderList
