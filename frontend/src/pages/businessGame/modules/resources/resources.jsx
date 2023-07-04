import React from "react"
import "./styles/resources.scss"
import TitleForGame from "../../components/titleForGame"
import GrayContainer from "../../components/grayContainer"
import ResourcesList from "./modules/resourcesList"
import { useChangeDisplay } from "../../hooks/hooks"

function Resources({ resources, ...props }) {
	const [display, setDisplay] = useChangeDisplay()

	return (
		<div className={"resources"}>
			<TitleForGame onclick={setDisplay} title={"Ресурсы"} />
			<div className="resources__container">
				{display ? (
					<>
						<GrayContainer>
							<ResourcesList resources={resources} />
						</GrayContainer>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default Resources
