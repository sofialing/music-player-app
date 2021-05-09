import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryDetails } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/navigation/Pagination';
import ErrorView from 'components/views/ErrorView';
import LoadingView from 'components/views/LoadingView';
import MainView from 'components/views/MainView';
import PageHeader from 'components/sections/PageHeader';
import GridSection from 'components/sections/GridSection';

const Category = () => {
	const { categoryId } = useParams();
	const [category, setCategory] = useState(null);
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(playlists);

	useEffect(() => {
		getCategoryDetails(categoryId, { limit, offset: (currentPage - 1) * limit })
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
