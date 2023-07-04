import React from "react"
import "../styles/resourcesItem.scss"
import "../styles/resources_sprite.scss"

function ResourceItem({ title, value, backgroundImage, ...props }) {
	return (
		<div className={"resource " + backgroundImage}>
			<div className="resource__info">
				<p className="resource__info_title">{title}</p>
				<p className="resource__info_value">{value}</p>
			</div>
		</div>
	)
}

export default ResourceItem
