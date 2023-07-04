import React, { useState } from "react"
import "./styles/diplomaAndLicense.scss"
import TitleSectionGame from "../../components/titleSectionGame"
import GrayContainer from "../../components/grayContainer"
import DocumentBlockList from "./components/documentBlockList"
import { useChangeDisplay } from "../../hooks/hooks"
import TitleForGame from "../../components/titleForGame"

function DiplomaAndLicense({ diplomasAndLicenses }) {
	const [display, changeDisplay] = useChangeDisplay()

	return (
		<div className={"diploma_and_license_container"}>
			<div className="diploma_and_license_body">
				<TitleForGame onclick={changeDisplay} title={"Дипломы и лицензии"} />
				{display ? (
					<GrayContainer>
						<DocumentBlockList diplomasAndLicenses={diplomasAndLicenses} />
					</GrayContainer>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default DiplomaAndLicense
