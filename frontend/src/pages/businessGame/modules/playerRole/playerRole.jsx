import React from "react"
import "./styles/playerRole.scss"
import MinisterEconomy from "../../roles/ministrEconomy/ministerEconomy"
import President from "../../roles/president/president"
import Mvd from "../../roles/mvd/mvd"
import MinisterEdu from "../../roles/ministerEdu/ministerEdu"
import MinisterZkh from "../../roles/ministerZkh/ministerZkh"
import Smi from "../../roles/smi/smi"
import Bank from "../../roles/bank/bank"

function PlayerRole({ role, roleData, actions, treasure, bankMoney, bankSalary }) {
	let child = <></>

	switch (role) {
		case "president":
			child = <President treasure={treasure} actions={actions.presidentActions} />
			break
		case "mvd":
			child = <Mvd roleData={roleData} actions={actions.ministerMVDActions} />
			break
		case "minister_economy":
			child = <MinisterEconomy actions={actions.ministerEconomyActions} />
			break
		case "minister_education":
			child = (
				<MinisterEdu roleData={roleData} actions={actions.ministerEducationsActions} />
			)
			break
		case "minister_zkh":
			child = <MinisterZkh roleData={roleData} actions={actions.ministerJKHActions} />
			break
		case "smi":
			child = <Smi roleData={roleData} actions={actions.smiActions} />
			break
		case "bank":
			child = (
				<Bank
					bankMoney={bankMoney}
					bankSalary={bankSalary}
					roleData={roleData}
					actions={actions.creditActions}
				/>
			)
			break
		case "architector":
			child = <></>
			break
		case "builder":
			child = <></>
			break
		case "manufacturer":
			child = <></>
			break
	}

	return <>{child}</>
	// return (
	// 	<Bank
	// 		bankMoney={bankMoney}
	// 		bankSalary={bankSalary}
	// 		roleData={roleData}
	// 		actions={actions.creditActions}
	// 	/>
	// )
}

export default PlayerRole
