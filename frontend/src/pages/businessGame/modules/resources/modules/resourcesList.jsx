import React from "react"
import "../styles/resourcesList.scss"
import "../styles/resources_sprite.scss"
import ResourceItem from "./resourceItem"
import Empty from "../../empty/empty"
import ResourceItemLength from "./resourceItemLength"

function ResourcesList({ resources }) {
	function getResourcesComponents() {
		const resourceList = []

		for (const resource in resources) {
			if (resources[resource] === 0) {
				continue
			}
			switch (resource) {
				case "money":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-money"}
								title={"Деньги"}
								value={resources[resource] + " ₽"}
							/>
						</div>
					)
					break
				case "wood":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-wood"}
								title={"Дерево"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "advertising":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-advertisements"}
								title={"Реклама"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "glass":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-glass"}
								title={"Стекло"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "brick":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-brick"}
								title={"Кирпич"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "shingles":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-shingles"}
								title={"Черепица"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "small_area":
					resourceList.push(
						<div key={resource} className="resources_list__length">
							<ResourceItemLength
								backgroundImage={"icon-little_landscape"}
								title={"Маленький участок земли"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "big_area":
					resourceList.push(
						<div key={resource} className="resources_list__length">
							<ResourceItemLength
								backgroundImage={"icon-big_landscape"}
								title={"Большой участок земли"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "tap":
					resourceList.push(
						<div key={resource} className="resources_list__length">
							<ResourceItemLength
								backgroundImage={"icon-kran"}
								title={"Кран"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "communications":
					resourceList.push(
						<div key={resource} className="resources_list__length">
							<ResourceItemLength
								backgroundImage={"icon-communication"}
								title={"Коммуникации"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "plan_of_small_house":
					resourceList.push(
						<div key={resource} className="resources_list__length">
							<ResourceItemLength
								backgroundImage={"icon-plan_little_house"}
								title={"План малого дома"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "plan_of_big_house":
					resourceList.push(
						<div key={resource} className="resources_list__length">
							<ResourceItemLength
								backgroundImage={"icon-big_house_plan"}
								title={"План большого дома"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "small_house":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-little_house"}
								title={"Малый дом"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
				case "big_house":
					resourceList.push(
						<div key={resource} className="resources_list__short">
							<ResourceItem
								backgroundImage={"icon-big_house"}
								title={"Большой дом"}
								value={resources[resource] + " шт."}
							/>
						</div>
					)
					break
			}
		}

		if (resourceList.length === 0) {
			return <Empty text={"У вас нет ресурсов."} />
		}

		return resourceList
	}

	return <div className={"resources_list"}>{getResourcesComponents()}</div>
}

export default ResourcesList
