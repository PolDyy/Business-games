import React from "react"
import "../styles/userGameListTableHeaderList.scss"
import UserGameListTableHeader from "./userGameListTableHeader"

function UserGameListTableHeaderList(props) {
	return (
		<tr className={"user_game_list_table__container"}>
			<UserGameListTableHeader header={"Название"} />
			<UserGameListTableHeader header={"Роль"} />
			<UserGameListTableHeader header={"Число участников"} />
			<UserGameListTableHeader header={"Последний год игры"} />
			<UserGameListTableHeader header={"Время окончания игры"} />
		</tr>
	)
}

export default UserGameListTableHeaderList
