import React from "react"
import "./styles/playersFunction.scss"
import ButtonPurple from "../../../../components/UI-UX/button_purple"

function PlayersFunction({ possibilities, baseRoleActions }) {
	return (
		<>
			{possibilities.length !== 0 ? (
				<div className={"players_function_container"}>
					<div className={"players_function"}>
						<p className="players_function__title">
							У вас появились новые возможности!
						</p>
						<div className="players_function__list">
							{possibilities.map((item, index) => {
								const attribute = item.attribute
								let action
								if (["brick", "wood", "glass", "shingles"].includes(attribute)) {
									action = () => {
										baseRoleActions.getResourceByLicense({ method: attribute })
									}
								}
								if (["small_house_plan", "big_house_plan"].includes(attribute)) {
									action = () => {
										baseRoleActions.getHousePlan({ method: attribute })
									}
								}
								if (["small_house", "big_house"].includes(attribute)) {
									action = () => {
										baseRoleActions.buildHouse({ method: attribute })
									}
								}

								return (
									<div key={index} className="players_function__list_btn">
										<ButtonPurple onclick={action} children={item.name} />
									</div>
								)
							})}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default PlayersFunction
