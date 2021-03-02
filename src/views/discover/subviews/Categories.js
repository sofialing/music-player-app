import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import usePagination from 'hooks/usePagination';
import PageHeader from 'components/layout/PageHeader';
import CategoryCard from 'components/partials/cards/CategoryCard';
import Pagination from 'components/layout/Pagination';
import { getCategories } from 'services/spotifyAPI';
import './Categories.scss';

const Categories = () => {
	const { state } = useLocation();
	const [categories, setCategories] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(categories);

	useEffect(() => {
		if (state && state.categories && currentPage === 1) {
			return setCategories(state.categories);
		}
		getCategories({ offset: (currentPage - 1) * limit })
			.then(data => setCategories(data))
			.catch(error => console.log(error));

	}, [state, currentPage, limit])

	return categories && (
		<main id="categories" className="main-view">
			<PageHeader title="Genres & themes" />
			<section className="categories">
				<ul className="grid">
					{categories.total && categories.items.map(category => <CategoryCard category={category} key={category.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default Categories;
