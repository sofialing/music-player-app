import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import TrackListItem from 'components/partials/track/TrackListItem';

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
			<header className="header">
				<h2 className="title">Top Tracks</h2>
			</header>
			<ul className="list">
				{topTracks.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default ArtistTopTracks;
