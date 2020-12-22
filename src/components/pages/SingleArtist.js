import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext'
import TopTracksList from '../artists/TopTracksList';
import DiscographyList from '../artists/DiscographyList';
import RelatedArtistsList from '../artists/RelatedArtistsList';
import ArtistHeader from '../artists/ArtistHeader';

const SingleArtist = () => {
	const { artistId } = useParams();
	const { spotify } = usePlayer();
	const [artist, setArtist] = useState(null);
	const [topTracks, setTopTracks] = useState(null);
	const [discography, setDiscography] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);

	useEffect(() => {
		spotify.getArtist(artistId)
			.then(data => setArtist(data))
			.catch(error => console.log(error))
		spotify.getArtistTopTracks(artistId, 'SE')
			.then(data => setTopTracks(data.tracks.slice(0, 5)))
			.catch(error => console.log(error))
		spotify.getArtistAlbums(artistId, { limit: 4 })
			.then(data => setDiscography(data))
			.catch(error => console.log(error))
		spotify.getArtistRelatedArtists(artistId)
			.then(data => setRelatedArtists(data.artists.slice(0, 6)))
			.catch(error => console.log(error))
	}, [artistId, spotify])

	return (
		<main className="single-artist-page">
			{artist && topTracks && discography && relatedArtists && (
				<>
					<ArtistHeader artist={artist} />
					<TopTracksList topTracks={topTracks} />
					<DiscographyList discography={discography} />
					<RelatedArtistsList relatedArtists={relatedArtists} />
				</>
			)}
		</main>
	)
}

export default SingleArtist
