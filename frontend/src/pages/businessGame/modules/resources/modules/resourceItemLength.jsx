import React from "react"
import "../styles/resourceItemLength.scss"
import "../styles/resources_sprite.scss"

function ResourceItemLength({ title, value, backgroundImage, ...props }) {
	return (
		<div className={"resource_length " + backgroundImage}>
			<div className="resource_length__info">
				<p className="resource_length__info_text">{title}</p>
				<p className="resource_length__info_value">{value}</p>
			</div>
		</div>
	)
}

export default ResourceItemLength
