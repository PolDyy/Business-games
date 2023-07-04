import React from "react"
import "../styles/userGameListTableColList.scss"
import UserGameListTableCol from "./userGameListTableCol"

function UserGameListTableColList({
	name,
	role,
	years,
	totalPlayers,
	endDate,
	...props
}) {
	return (
		<tr className={"user_game_list_table__tr"}>
			<UserGameListTableCol col={name} />
			<UserGameListTableCol col={role} />
			<UserGameListTableCol col={years} />
			<UserGameListTableCol col={totalPlayers} />
			<UserGameListTableCol col={"15:23"} date={endDate} />
		</tr>
	)
}

export default UserGameListTableColList
