import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import usePagination from '../../hooks/usePagination'
import PageHeader from '../elements/PageHeader'
import CategoryCard from '../elements/CategoryCard'
import Pagination from '../elements/Pagination'

const AllCategories = () => {
	const { spotify } = useAuth();
	const { state } = useLocation();
	const [categories, setCategories] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(categories);

	useEffect(() => {
		if (state && state.categories && currentPage === 1) {
			return setCategories(state.categories);
		}
		const options = {
			country: 'from_token',
			offset: (currentPage - 1) * limit,
		};
		spotify.getCategories(options)
			.then(({ categories }) => setCategories(categories))
			.catch(error => console.log(error))

	}, [spotify, state, currentPage, limit])

	return categories && (
		<main className="categories-page">
			<PageHeader title="Genres & themes" />
			<section>
				<ul>
					{categories.total && categories.items.map((category, index) => <CategoryCard category={category} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllCategories
