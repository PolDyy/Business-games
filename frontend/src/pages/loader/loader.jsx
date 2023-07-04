import React from "react"
import "./loader.scss"
import Layout from "../../components/layouts/layout"

function Loader() {
	return (
		<Layout>
			<div className={"loader"}>
				<div className="loader__preloader"></div>
				<span className="loader__text">Пожалуйста, подождите...</span>
			</div>
		</Layout>
	)
}

export default Loader
