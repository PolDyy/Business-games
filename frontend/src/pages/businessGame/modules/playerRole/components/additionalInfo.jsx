import React from "react"
import "./styles/additionalInfo.scss"
import GrayContainer from "../../../components/grayContainer"

function AdditionalInfo({ title, descr, ...props }) {
	return (
		<GrayContainer>
			<div className={"additional_info_container"}>
				<p className="additional_info_title">{title}</p>
				<p className="additional_info_descr">{descr}</p>
				<a href="#" className="more_info link_reset">
					Подробнее
				</a>
			</div>
		</GrayContainer>
	)
}

export default AdditionalInfo
