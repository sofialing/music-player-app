import { useState, useEffect } from 'react';
import SavedTracks from 'components/favorites/SavedTracks';
import TopArtists from 'components/favorites/TopArtists';
import TopTracks from 'components/favorites/TopTracks';
import Spinner from 'components/partials/Spinner';
import { useAuth } from 'contexts/AuthContext';
import { getMySavedTracks } from 'services/spotifyAPI';
import './Favorites.scss';

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
				console.log(error)
				setError(true);
				setLoading(false);
			});
	}, [])

	if (loading) {
		return <Spinner />;
	}

	return (
		<main id="favorites" className="main-view">
			<header className="header">
				<h1 className="title">Your favorite music</h1>
			</header>
			<TopTracks tracks={top_tracks} />
			<TopArtists artists={top_artists} />
			<SavedTracks tracks={tracks} />
		</main>
	)
}

export default Favorites;
