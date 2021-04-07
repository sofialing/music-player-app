import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { getRecommendations } from 'services/spotifyAPI';
import ErrorView from 'components/views/ErrorView';
import LoadingView from 'components/views/LoadingView';
import MainView from 'components/views/MainView';
import PageHeader from 'components/sections/PageHeader';
import ListSection from 'components/sections/ListSection';

const Recommendations = () => {
	const { top_artists, top_tracks } = useAuth();
	const [recommendations, setRecommendations] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getRecommendations(top_artists.items, top_tracks.items)
			.then(tracks => {
				setRecommendations(tracks);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			})

	}, [top_artists, top_tracks])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="recommendations" pageTitle="Recommendations">
			<PageHeader title="Recommended for you" />
			<ListSection items={recommendations} />
		</MainView>
	)
}

export default Recommendations;
