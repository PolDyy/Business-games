import React from "react"
import "../styles/userGameListTableHeader.scss"

function UserGameListTableHeader({ header, ...props }) {
	return (
		<div className={"table_header"}>
			<div className="table_header__arrow"></div>
			<th className={"table_header__header"}>{header}</th>
		</div>
	)
}

export default UserGameListTableHeader
