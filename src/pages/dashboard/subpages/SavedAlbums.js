import { useEffect, useState } from 'react';
import { getUsersSavedAlbums } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/navigation/Pagination';
import LoadingView from 'components/views/LoadingView';
import MainView from 'components/views/MainView';
import PageHeader from 'components/sections/PageHeader';
import GridSection from 'components/sections/GridSection';
import ErrorView from 'components/views/ErrorView';

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
