import React, { useEffect, useState } from "react"
import "../../../../components/paginator/styles/pagination.scss"

function PaginationBS({ page, totalPages, setPage, ...props }) {
	const prevPage = page - 1 === 0 ? false : page - 1
	const nextPage = page + 1 === totalPages.length + 1 ? false : page + 1

	return (
		<div className={"pagination"}>
			{prevPage ? (
				<button
					onClick={() => setPage(prevPage)}
					className="pagination__arrow_left btn_reset"
				></button>
			) : (
				<></>
			)}

			{totalPages.map((page) => {
				return (
					<button
						key={page}
						onClick={() => setPage(page)}
						className="pagination__button btn_reset"
					>
						{page}
					</button>
				)
			})}
			{nextPage ? (
				<button
					onClick={() => setPage(nextPage)}
					className="pagination__arrow btn_reset"
				></button>
			) : (
				<></>
			)}
		</div>
	)
}

export default PaginationBS
