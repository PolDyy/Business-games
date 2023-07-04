import React from "react"
import "./styles/userEnterData.scss"
import Layout from "../../components/layouts/layout"
import FormAttributeCoordinator from "../profileEdit/profileEditCoordinator/modules/formAttributeCoordinator"
import ButtonPurple from "../../components/UI-UX/button_purple"

function UserEnterData() {
	return (
		<div>
			<Layout>
				<form className="user_enter_data">
					<FormAttributeCoordinator />
					<div className="user_enter_data_btn">
						<ButtonPurple children={"Присоединиться к игре"} />
					</div>
				</form>
			</Layout>
		</div>
	)
}

export default UserEnterData
