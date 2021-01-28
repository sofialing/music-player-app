import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import PageHeader from 'components/layout/PageHeader';
import TrackListItem from 'components/partials/track/TrackListItem';
import './RecommendedTracks.scss';

const RecommendedTracks = () => {
	const { spotify, top_artists, top_tracks } = useAuth();
	const { state } = useLocation();
	const [recommendations, setRecommendations] = useState(null);

	useEffect(() => {
		if (state && state.recommendations) {
			return setRecommendations(state.recommendations)
		}

		const artistIds = top_artists.items.map(item => item.id).splice(0, 3).join(',');
		const trackIds = top_tracks.items.map(item => item.id).splice(0, 2).join(',');

		spotify.getRecommendations({ market: 'from_token', seed_artists: artistIds, seed_tracks: trackIds })
			.then(({ tracks }) => setRecommendations(tracks))
			.catch(error => console.log(error))

	}, [spotify, top_artists, top_tracks, state])

	return (
		<main id="recommended-tracks" className="main-view">
			<PageHeader title="Recommendations for you" />
			<section className="tracks">
				<ul className="list">
					{recommendations && recommendations.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default RecommendedTracks;
