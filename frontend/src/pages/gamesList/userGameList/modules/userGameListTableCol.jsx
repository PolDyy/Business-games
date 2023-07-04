import React from "react"
import "../styles/userGameListTableCol.scss"

function UserGameListTableCol({ col, date, ...props }) {
	return (
		<>
			<td className={"table_col"}>
				{col}
				<span className="table_col__date">{date}</span>
			</td>
		</>
	)
}

export default UserGameListTableCol
