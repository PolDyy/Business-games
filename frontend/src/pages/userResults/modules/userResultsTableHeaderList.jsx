import React from "react"
import "../styles/userResultsTableHeaderList.scss"
import UserGameListTableHeader from "../../gamesList/userGameList/modules/userGameListTableHeader"

function UserResultsTableHeaderList(props) {
	return (
		<tr className={"user_results_table__container"}>
			<UserGameListTableHeader header={"Название"} />
			<UserGameListTableHeader header={"Деньги"} />
			<UserGameListTableHeader header={"Большие дома"} />
			<UserGameListTableHeader header={"Малые дома"} />
			<UserGameListTableHeader header={"Число участников"} />
			<UserGameListTableHeader header={"Последний год игры"} />
			<UserGameListTableHeader header={"Время окончания игры"} />
		</tr>
	)
}

export default UserResultsTableHeaderList
