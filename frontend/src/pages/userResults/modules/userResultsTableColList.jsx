import React from "react"
import "../styles/userResultsTableColList.scss"
import UserGameListTableCol from "../../gamesList/userGameList/modules/userGameListTableCol"

function UserResultsTableColList(props) {
	return (
		<tr className={"user_results_table__container"}>
			<UserGameListTableCol col={"Игра 1"} />
			<UserGameListTableCol col={"7800 ₽"} />
			<UserGameListTableCol col={"2 шт."} />
			<UserGameListTableCol col={"2 шт."} />
			<UserGameListTableCol col={"16"} />
			<UserGameListTableCol col={"1"} />
			<UserGameListTableCol col={"15:23"} date={"29/09/2021"} />
		</tr>
	)
}

export default UserResultsTableColList
