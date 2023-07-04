import React from "react"
import "../styles/documentBlockList.scss"
import DocumentBlock from "./documentBlock"
import InvisibleBlock from "./invisibleBlock"
import Empty from "../../empty/empty"

function DocumentBlockList({ diplomasAndLicenses }) {
	return (
		<div className={"document_block_list"}>
			{diplomasAndLicenses.length !== 0 ? (
				<>
					{diplomasAndLicenses.map((item, index) => {
						let timing = "Срок: " + item.life_time + " г."
						if (item.life_time === "Бессрочно") {
							timing = item.life_time
						}
						return <DocumentBlock key={index} title={item.title} timing={timing} />
					})}
					<InvisibleBlock />
					<InvisibleBlock />
				</>
			) : (
				<Empty text={"Нет дипломов и лицензий"} />
			)}
		</div>
	)
}

export default DocumentBlockList
