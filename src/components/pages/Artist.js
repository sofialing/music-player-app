import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext'
import TopTracks from '../artists/TopTracks';
import DiscographyList from '../artists/DiscographyList';
import RelatedArtists from '../artists/RelatedArtists';
import ArtistHeader from '../artists/ArtistHeader';

const Artist = () => {
	const { artistId } = useParams();
	const { spotify } = usePlayer();
	const [artist, setArtist] = useState(null);
	const [topTracks, setTopTracks] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);

	useEffect(() => {
		spotify.getArtist(artistId)
			.then(data => setArtist(data))
			.catch(error => console.log(error))
		spotify.getArtistTopTracks(artistId, 'SE')
			.then(data => setTopTracks(data.tracks.slice(0, 5)))
			.catch(error => console.log(error))
		spotify.getArtistAlbums(artistId, { limit: 4 })
			.then(data => setAlbums(data))
			.catch(error => console.log(error))
		spotify.getArtistRelatedArtists(artistId)
			.then(data => setRelatedArtists(data.artists.slice(0, 6)))
			.catch(error => console.log(error))
	}, [artistId, spotify])

	return (
		<main className="artist-page">
			{artist && topTracks && albums && relatedArtists && (
				<>
					<ArtistHeader artist={artist} />
					<TopTracks tracks={topTracks} />
					<DiscographyList albums={albums} />
					<RelatedArtists artists={relatedArtists} />
				</>
			)}
		</main>
	)
}

export default Artist
