import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { getFeaturedPlaylists, getNewReleases, getCategories, getRecommendations } from 'services/spotifyAPI';
import LoadingView from 'components/views/LoadingView';
import ErrorView from 'components/views/ErrorView';
import PageHeader from 'components/sections/PageHeader';
import MainView from 'components/views/MainView';
import GridSection from 'components/sections/GridSection';

const Discover = () => {
	const { top_artists, top_tracks } = useAuth();
	const [recommendations, setRecommendations] = useState(null);
	const [releases, setReleases] = useState(null);
	const [featured, setFeatured] = useState(null);
	const [categories, setCategories] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const FETCH_DATA = [
			getRecommendations(top_artists.items, top_tracks.items),
			getNewReleases(),
			getFeaturedPlaylists(),
			getCategories(),
		];
		Promise.all(FETCH_DATA)
			.then(([recommendations, releases, featured, categories]) => {
				setRecommendations(recommendations);
				setReleases(releases);
				setFeatured(featured);
				setCategories(categories);
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
		<MainView id="discover" pageTitle="Discover">
			<PageHeader title="Discover new music" />
			<GridSection title="Recommended For You" link="recommendations" items={recommendations} />
			<GridSection title="New albums & singles" link="new-releases" items={releases.items} />
			<GridSection title={featured.message} link="featured-playlists" items={featured.playlists.items} />
			<GridSection title="Genres & themes" link="categories" items={categories.items} />
		</MainView>
	)
}

export default Discover;
