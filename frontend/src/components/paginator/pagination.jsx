import React, { useEffect, useState } from "react"
import "./styles/pagination.scss"

function Pagination({ callback, setValue }) {
	const [page, setPage] = useState(1)

	const [totalPages, setTotalPages] = useState([0])

	const [nextPage, setNextPage] = useState(1)
	const [prevPage, setPrevPage] = useState(1)

	function getData() {
		callback(page).then((data) => {
			setValue(data.data)
			setPage(data.current_page)
			setTotalPages([...Array(data.total_pages).keys()].map((i) => i + 1))
			setNextPage(data.next)
			setPrevPage(data.prev)
		})
	}

	useEffect(() => {
		getData()
	}, [page])

	function changePage(ToPage) {
		setPage(ToPage)
	}

	return (
		<div className={"pagination"}>
			{prevPage ? (
				<button
					onClick={() => {
						changePage(page - 1)
					}}
					className="pagination__arrow_left btn_reset"
				></button>
			) : (
				<></>
			)}
			{totalPages.map((pageNumber, index) => {
				return (
					<button
						key={index}
						onClick={() => {
							changePage(pageNumber)
						}}
						className="pagination__button btn_reset"
					>
						{pageNumber}
					</button>
				)
			})}
			{nextPage ? (
				<button
					onClick={() => {
						changePage(page + 1)
					}}
					className="pagination__arrow btn_reset"
				></button>
			) : (
				<></>
			)}
		</div>
	)
}

export default Pagination
