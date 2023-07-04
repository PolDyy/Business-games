import React from "react"
import UserGameListTableCol from "../../gamesList/userGameList/modules/userGameListTableCol"

function PlayersListTableColList({
	firstName,
	secondName,
	email,
	games,
	createdAt,
	...props
}) {
	return (
		<tr className={"players_list_table__container"}>
			<td className={"players_list_table__container_th"}>
				<UserGameListTableCol col={secondName} />
			</td>
			<td className={"players_list_table__container_th"}>
				<UserGameListTableCol col={firstName} />
			</td>
			<td className={"players_list_table__container_th"}>
				<UserGameListTableCol col={email} />
			</td>
			<td className={"players_list_table__container_th"}>
				<UserGameListTableCol col={games} />
			</td>
			<td className={"players_list_table__container_th"}>
				<UserGameListTableCol col={"15:23"} date={createdAt} />
			</td>
		</tr>
	)
}

export default PlayersListTableColList
