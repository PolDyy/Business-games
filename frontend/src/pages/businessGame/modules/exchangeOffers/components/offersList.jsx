import React, { useEffect, useState } from "react"
import "../styles/offersList.scss"
import PaginationBS from "../../../components/paginatorBs/paginatorBS"
import Empty from "../../empty/empty"

function OffersList({ offers, emptyText }) {
	const [page, setPage] = useState(1)
	const [currentPageOffers, setCurrentPageOffers] = useState([])
	const [totalPages, setTotalPages] = useState([])
	useEffect(() => {
		setTotalPages([...Array(Math.ceil(offers.length / 5)).keys()].map((i) => i + 1))
		setCurrentPageOffers(offers.slice(page * 5 - 5, page * 5))
		if (currentPageOffers.length === 1 && page > 1) setPage(page - 1)
	}, [offers, page])

	return (
		<div className={"offers_list"}>
			{currentPageOffers.length !== 0 ? (
				<>
					{currentPageOffers}
					<PaginationBS page={page} totalPages={totalPages} setPage={setPage} />
				</>
			) : (
				<Empty text={emptyText} />
			)}
		</div>
	)
}

export default OffersList
