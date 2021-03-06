import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { getMySavedTracks } from 'services/spotifyAPI';
import ErrorView from 'components/views/ErrorView';
import LoadingView from 'components/views/LoadingView';
import PageHeader from 'components/sections/PageHeader';
import MainView from 'components/views/MainView';
import GridSection from 'components/sections/GridSection';

const Favorites = () => {
	const { top_artists, top_tracks } = useAuth();
	const [tracks, setTracks] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

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
		<MainView id="favorites" pageTitle="Favorites">
			<PageHeader title="Favorites" />
			<GridSection title="Your top artists" link="top-artists" items={top_artists.items} />
			<GridSection title="Your top tracks" link="top-tracks" items={top_tracks.items} />
			<GridSection title="Liked tracks" link="tracks" items={tracks.items} />
		</MainView>
	)
}

export default Favorites;
