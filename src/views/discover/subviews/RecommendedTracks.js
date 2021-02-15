import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import PageHeader from 'components/layout/PageHeader';
import TrackListItem from 'components/partials/track/TrackListItem';
import { getRecommendations } from 'services/spotifyAPI';
import './RecommendedTracks.scss';

const RecommendedTracks = () => {
	const { top_artists, top_tracks } = useAuth();
	const { state } = useLocation();
	const [recommendations, setRecommendations] = useState(null);

	useEffect(() => {
		if (state && state.recommendations) {
			return setRecommendations(state.recommendations)
		}

		getRecommendations(top_artists.items, top_tracks.items)
			.then(data => setRecommendations(data))
			.catch(error => console.log(error))

	}, [top_artists, top_tracks, state])

	return recommendations && (
		<main id="recommended-tracks" className="main-view">
			<PageHeader title="Recommended for you" />
			<section className="tracks">
				<ul className="list">
					{recommendations.map(track => <TrackListItem track={track} album={track.album} key={track.id} />)}
				</ul>
			</section>
		</main>
	)
}

export default RecommendedTracks;
