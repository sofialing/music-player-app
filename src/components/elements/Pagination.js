import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const Pagination = ({ currentPage, nextPage, prevPage, maxPage }) => {
	return maxPage > 1 && (
		<footer className="pagination">
			<div onClick={prevPage} className={currentPage === 1 ? 'pagination__disabled' : 'pagination__prev'}>
				<ChevronLeftIcon />
				<span>Previous</span>
			</div>
			<div onClick={nextPage} className={currentPage === maxPage ? 'pagination__disabled' : 'pagination__next'}>
				<span>Next</span>
				<ChevronRightIcon />
			</div>
		</footer>
	)
}

export default Pagination
