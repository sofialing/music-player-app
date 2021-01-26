import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import TrackListItem from '../partials/TrackListItem'

const ArtistTopTracks = ({ artistId }) => {
	const { spotify } = useAuth();
	const [topTracks, setTopTracks] = useState(null);

	useEffect(() => {
		async function getData() {
			const data = await spotify.getArtistTopTracks(artistId, 'from_token');
			setTopTracks(data.tracks.splice(0, 5));
		}
		getData();
	}, [artistId, spotify])

	return topTracks && (
		<section className="top-tracks">
			<header>
				<h2>Top Tracks</h2>
			</header>
			<ul>
				{topTracks.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default ArtistTopTracks
