import React from "react"
import "./components/styles/applications.scss"
import GrayContainer from "../../components/grayContainer"

function Applications(props) {
	return (
		<div className={"applications_container"}>
			<div className="applications_container_body">
				<GrayContainer>
					<div className="applications_content">
						<p className="application_hint">Пока заявок не поступало :(</p>
					</div>
				</GrayContainer>
			</div>
		</div>
	)
}

export default Applications
