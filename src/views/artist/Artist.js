import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import ArtistTopTracks from 'components/artist/ArtistTopTracks';
import ArtistDiscography from 'components/artist/ArtistDiscography';
import ArtistRelatedArtists from 'components/artist/ArtistRelatedArtists';
import ArtistHeader from 'components/artist/ArtistHeader';
import './Artist.scss';

const Artist = () => {
	const { artistId } = useParams();
	const { spotify } = useAuth();
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
		<main id="artist" className="main-view">
			<ArtistHeader artist={artist} />
			<ArtistTopTracks artistId={artistId} />
			<ArtistDiscography artistId={artistId} />
			<ArtistRelatedArtists artistId={artistId} />
		</main>
	)
}

export default Artist;
