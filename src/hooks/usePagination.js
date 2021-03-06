import { useState } from 'react'

const usePagination = (data = [], limit = 24) => {
	const [currentPage, setCurrentPage] = useState(1);
	const maxPage = Math.ceil(data.total / limit);

	const nextPage = () => {
		window.scrollTo(0, 0);
		setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
	}
	const prevPage = () => {
		window.scrollTo(0, 0);
		setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
	}

	return { nextPage, prevPage, currentPage, maxPage, limit };
}
export default usePagination;
