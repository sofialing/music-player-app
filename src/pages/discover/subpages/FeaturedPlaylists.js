import { useEffect, useState } from 'react';
import { getFeaturedPlaylists } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/layout/navigation/Pagination';
import ErrorView from 'components/layout/views/ErrorView';
import LoadingView from 'components/layout/views/LoadingView';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';

const FeaturedPlaylists = () => {
	const [playlists, setPlaylists] = useState([]);
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(playlists);

	useEffect(() => {
		getFeaturedPlaylists({ limit, offset: (currentPage - 1) * limit })
			.then(({ message, playlists }) => {
				document.title = process.env.REACT_APP_PAGE_TITLE + message;
				setTitle(message);
				setPlaylists(playlists);
				setLoading(false);
			}).catch(error => {
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
		<MainView id="featured-playlists">
			<PageHeader title={title} />
			<GridSection items={playlists.items} limit={playlists.limit} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default FeaturedPlaylists;
