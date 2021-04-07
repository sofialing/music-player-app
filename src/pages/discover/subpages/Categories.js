import { useEffect, useState } from 'react';
import { getCategories } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/navigation/Pagination';
import ErrorView from 'components/views/ErrorView';
import LoadingView from 'components/views/LoadingView';
import MainView from 'components/views/MainView';
import PageHeader from 'components/sections/PageHeader';
import GridSection from 'components/sections/GridSection';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(categories);

	useEffect(() => {
		getCategories({ limit, offset: (currentPage - 1) * limit })
			.then(categories => {
				setCategories(categories);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});

	}, [currentPage, limit])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="categories" pageTitle="Genres & themes">
			<PageHeader title="Genres & themes" />
			<GridSection items={categories.items} limit={categories.limit} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default Categories;
