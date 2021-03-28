import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';

const TopArtists = () => {
	const { top_artists } = useAuth();

	useEffect(() => {
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Favorites';
	}, [])

	return (
		<MainView id="top-artists">
			<PageHeader title="Your top artists" />
			<GridSection items={top_artists.items} limit={top_artists.limit} />
		</MainView>
	)
}

export default TopArtists;
