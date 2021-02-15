import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArtistTopTracks from 'components/artist/ArtistTopTracks';
import ArtistDiscography from 'components/artist/ArtistDiscography';
import ArtistRelatedArtists from 'components/artist/ArtistRelatedArtists';
import ArtistHeader from 'components/artist/ArtistHeader';
import Spinner from 'components/partials/Spinner';
import { getArtist, getArtistTopTracks, getArtistRelatedArtists, getArtistAlbums } from 'services/spotifyAPI';
import './Artist.scss';

const Artist = () => {
	const { artistId } = useParams();
	const [artist, setArtist] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [topTracks, setTopTracks] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);
	const [loading, setLoading] = useState(true);

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
				setArtist(artist);
				setTopTracks(topTracks);
				setRelatedArtists(relatedArtists);
				setAlbums(albums);
				setLoading(false);
			})
			.catch(error => console.log(error))
	}, [artistId])

	if (loading) {
		return <Spinner />;
	}

	return artist && (
		<main id="artist" className="main-view">
			<ArtistHeader artist={artist} />
			<ArtistTopTracks topTracks={topTracks} />
			<ArtistDiscography albums={albums} />
			<ArtistRelatedArtists artists={relatedArtists} />
		</main>
	)
}

export default Artist;
