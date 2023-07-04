import React from "react"
import "../styles/watchActiveGameTable.scss"
import WatchActiveGameTableHeaderList from "./watchActiveGameTableHeaderList"
import WatchActiveGameTableColList from "./watchActiveGameTableColList"

function WatchActiveGameTable({ players }) {
	return (
		<table className={"watch_active_game_table"}>
			<thead>
				<WatchActiveGameTableHeaderList />
			</thead>
			<tbody>
				{players.map((player, index) => {
					return (
						<WatchActiveGameTableColList
							key={index}
							fullName={player.name}
							role={player.role}
							resource={player.resources}
						/>
					)
				})}
			</tbody>
		</table>
	)
}

export default WatchActiveGameTable
