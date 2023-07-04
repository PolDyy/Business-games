import React from "react"
import "../styles/lobbyPlayersList.scss"
import Player from "./player"
import PlayersTitle from "./playersTitle"

function LobbyPlayersList({ players }) {
	return (
		<div className={"lobby_players_list"}>
			<PlayersTitle />
			{players.map((item, key) => {
				return <Player key={key} name={item.name} />
			})}
		</div>
	)
}

export default LobbyPlayersList
