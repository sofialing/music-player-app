import { useEffect, useState } from 'react';
import { getUsersSavedAlbums } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/layout/navigation/Pagination';
import LoadingView from 'components/layout/views/LoadingView';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';
import ErrorView from 'components/layout/views/ErrorView';

const SavedAlbums = () => {
	const [savedAlbums, setSavedAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(savedAlbums);

	useEffect(() => {
		getUsersSavedAlbums({ limit, offset: (currentPage - 1) * limit })
			.then(artists => {
				setSavedAlbums(artists);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			})
	}, [currentPage, limit])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="user-albums" pageTitle="Dashboard">
			<PageHeader title="Albums" />
			<GridSection items={savedAlbums.items} limit={savedAlbums.limit} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default SavedAlbums;
