import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import usePagination from 'hooks/usePagination';
import PageHeader from 'components/layout/PageHeader';
import CategoryCard from 'components/partials/CategoryCard';
import Pagination from 'components/layout/Pagination';
import './Categories.scss';

const Categories = () => {
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
		<main id="categories" className="main-view">
			<PageHeader title="Genres & themes" />
			<section className="categories">
				<ul className="grid">
					{categories.total && categories.items.map((category, index) => <CategoryCard category={category} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default Categories;
