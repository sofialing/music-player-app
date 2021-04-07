import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist, getPlaylistTracks } from 'services/spotifyAPI'
import ErrorView from 'components/views/ErrorView';
import LoadingView from 'components/views/LoadingView';
import MainView from 'components/views/MainView';
import ListSection from 'components/sections/ListSection';
import HeroSection from 'components/sections/HeroSection';

const Playlist = () => {
	const { playlistId } = useParams();
	const [playlist, setPlaylist] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const FETCH_DATA = [
			getPlaylist(playlistId),
			getPlaylistTracks(playlistId)
		];
		Promise.all(FETCH_DATA)
			.then(([playlist, tracks]) => {
				setPlaylist(playlist);
				setTracks(tracks);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			})
	}, [playlistId])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="playlist" pageTitle={playlist.name}>
			<HeroSection
				title={playlist.name}
				subtitle={playlist.type}
				player_uri={playlist.player_uri}
				image_url={playlist.image_url}
				description={playlist.description}
				details={`by ${playlist.owner} · ${playlist.total_tracks} tracks · ${playlist.followers} followers`} />
			<ListSection items={tracks.items} />
		</MainView>
	)
}

export default Playlist;
