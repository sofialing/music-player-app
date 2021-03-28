import { useEffect, useState } from 'react';
import { getUserPlaylists } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/layout/navigation/Pagination';
import LoadingView from 'components/layout/views/LoadingView';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';
import ErrorView from 'components/layout/views/ErrorView';

const UserPlaylists = () => {
	const [userPlaylists, setUserPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(userPlaylists);

	useEffect(() => {
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Dashboard';
	}, [])

	useEffect(() => {
		getUserPlaylists({ limit, offset: (currentPage - 1) * limit })
			.then(playlists => {
				setUserPlaylists(playlists);
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
		<MainView id="user-playlists">
			<PageHeader title="Playlists" />
			<GridSection items={userPlaylists.items} limit={userPlaylists.limit} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default UserPlaylists;
