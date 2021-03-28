import { useEffect, useState } from 'react';
import { getCategories } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/layout/navigation/Pagination';
import ErrorView from 'components/layout/views/ErrorView';
import LoadingView from 'components/layout/views/LoadingView';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(categories);

	useEffect(() => {
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Genres & themes';
	}, [])

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
		<MainView id="categories">
			<PageHeader title="Genres & themes" />
			<GridSection items={categories.items} limit={categories.limit} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default Categories;
