import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import TrackListItem from 'components/partials/track/TrackListItem';
import './Recommendations.scss';

const Recommendations = () => {
	const { spotify, top_artists, top_tracks } = useAuth();
	const [recommendations, setRecommendations] = useState(null);

	useEffect(() => {
		const artistIds = top_artists.items.map(item => item.id).slice(0, 3).join(',');
		const trackIds = top_tracks.items.map(item => item.id).slice(0, 2).join(',');

		spotify.getRecommendations({ market: 'from_token', seed_artists: artistIds, seed_tracks: trackIds })
			.then(({ tracks }) => setRecommendations(tracks))
			.catch(error => console.log(error))


	}, [spotify, top_artists, top_tracks])

	return recommendations && (
		<section className="recommendations">
			<header className="header">
				<Link to='recommended-tracks' state={{ recommendations }}>
					<h2 className="title">Recommended for you</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="list">
				{recommendations.slice(0, 5).map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default Recommendations;
