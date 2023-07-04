import React from "react"
import "../styles/resourcesItem.scss"

function ResourceItemInvisible({ title, value, ...pros }) {
	return (
		<div className={"resource resource_invisible"}>
			<div className="resource__info">
				<p className="resource__info_title">{title}</p>
				<p className="resource__info_value">{value}</p>
			</div>
		</div>
	)
}

export default ResourceItemInvisible
