import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext'
import ArtistTopTracks from '../artist/ArtistTopTracks';
import ArtistDiscography from '../artist/ArtistDiscography';
import ArtistRelatedArtists from '../artist/ArtistRelatedArtists';
import ArtistHeader from '../artist/ArtistHeader';

const Artist = () => {
	const { artistId } = useParams();
	const { spotify } = usePlayer();
	const { state } = useLocation();
	const [artist, setArtist] = useState(null);

	useEffect(() => {
		if (state && state.artist) {
			setArtist(state.artist);
		} else {
			spotify.getArtist(artistId).then(data => setArtist(data))
		}
	}, [artistId, spotify, state])

	return artist && (
		<main className="artist-page">
			<ArtistHeader artist={artist} />
			<ArtistTopTracks artistId={artistId} />
			<ArtistDiscography artistId={artistId} />
			<ArtistRelatedArtists artistId={artistId} />
		</main>
	)
}

export default Artist
