import React from "react"
import "./styles/inputSearch.scss"
import search from "../../static/img/create_game/search.svg"

function InputSearch({ value, setValue }) {
	return (
		<div className={"search_form"}>
			<input
				value={value}
				type="search"
				placeholder={"Поиск"}
				className="input_search"
				onChange={(event) => {
					setValue(event.target.value)
				}}
			/>
			<button className={"search_form_btn btn_reset"} type="submit">
				<img className={"search_form_image"} src={search} alt="Search" />
			</button>
		</div>
	)
}

export default InputSearch
