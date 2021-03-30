import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbum } from 'services/spotifyAPI';
import ErrorView from 'components/layout/views/ErrorView';
import HeroSection from 'components/layout/sections/HeroSection';
import ListSection from 'components/layout/sections/ListSection';
import MainView from 'components/layout/views/MainView';
import LoadingView from 'components/layout/views/LoadingView';

const Album = () => {
	const { albumId } = useParams();
	const [album, setAlbum] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getAlbum(albumId)
			.then(data => {
				setAlbum(data);
				setLoading(false);
			})
			.catch(error => setError(error));
	}, [albumId])

	if (loading) {
		return <LoadingView />
	}

	if (error) {
		return <ErrorView />
	}

	return (
		<MainView id="album" pageTitle={album.name}>
			<HeroSection
				title={album.name}
				subtitle={album.type}
				player_uri={album.player_uri}
				image_url={album.image_url}
				description={album.artists}
				details={`${album.total_tracks} tracks · ${album.total_length} minutes`} />
			<ListSection items={album.tracks} displayAlbumTitle={false} />
		</MainView>
	)
}

export default Album;
