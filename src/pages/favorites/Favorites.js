import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { getMySavedTracks } from 'services/spotifyAPI';
import ErrorView from 'components/layout/views/ErrorView';
import LoadingView from 'components/layout/views/LoadingView';
import PageHeader from 'components/layout/sections/PageHeader';
import MainView from 'components/layout/views/MainView';
import GridSection from 'components/layout/sections/GridSection';

const Favorites = () => {
	const { top_artists, top_tracks } = useAuth();
	const [tracks, setTracks] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Favorites';
	}, [])

	useEffect(() => {
		getMySavedTracks()
			.then(data => {
				setTracks(data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, [])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="favorites">
			<PageHeader title="Favorites" />
			<GridSection title="Your top artists" link="top-artists" items={top_artists.items} />
			<GridSection title="Your top tracks" link="top-tracks" items={top_tracks.items} />
			<GridSection title="Your saved tracks" link="tracks" items={tracks.items} />
		</MainView>
	)
}

export default Favorites;
