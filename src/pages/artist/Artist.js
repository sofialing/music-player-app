import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getArtist, getArtistTopTracks, getArtistRelatedArtists, getArtistAlbums } from 'services/spotifyAPI';
import ErrorView from 'components/layout/views/ErrorView';
import GridSection from 'components/layout/sections/GridSection';
import HeroSection from 'components/layout/sections/HeroSection';
import ListSection from 'components/layout/sections/ListSection';
import MainView from 'components/layout/views/MainView';
import LoadingView from 'components/layout/views/LoadingView';

const Artist = () => {
	const { artistId } = useParams();
	const [artist, setArtist] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [topTracks, setTopTracks] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const FETCH_DATA = [
			getArtist(artistId),
			getArtistTopTracks(artistId),
			getArtistRelatedArtists(artistId),
			getArtistAlbums(artistId)
		];
		Promise.all(FETCH_DATA)
			.then(data => {
				const [artist, topTracks, relatedArtists, albums] = data;
				document.title = process.env.REACT_APP_PAGE_TITLE + artist.name;
				setArtist(artist);
				setTopTracks(topTracks);
				setRelatedArtists(relatedArtists);
				setAlbums(albums);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			})
	}, [artistId])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="artist" >
			<HeroSection
				title={artist.name}
				subtitle={artist.type}
				player_uri={artist.player_uri}
				image_url={artist.image_url}
				details={`${artist.followers} fans`} />
			<ListSection title="Top tracks" items={topTracks.slice(0, 5)} />
			<GridSection title='Discography' link='discography' items={albums.items} />
			<GridSection title='Related artists' link='related' items={relatedArtists} />
		</MainView>
	)
}

export default Artist;
