import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory, getCategoryPlaylists } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/layout/navigation/Pagination';
import ErrorView from 'components/layout/views/ErrorView';
import LoadingView from 'components/layout/views/LoadingView';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';

const Category = () => {
	const { categoryId } = useParams();
	const [category, setCategory] = useState(null);
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(playlists);

	useEffect(() => {
		const FETCH_DATA = [
			getCategory(categoryId),
			getCategoryPlaylists(categoryId, { limit, offset: (currentPage - 1) * limit })
		];
		Promise.all(FETCH_DATA)
			.then(([category, playlists]) => {
				setCategory(category);
				setPlaylists(playlists);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			})
	}, [categoryId, currentPage, limit])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="category" pageTitle={category.name}>
			<PageHeader title={category.name} />
			<GridSection items={playlists.items} limit={playlists.limit} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default Category;
