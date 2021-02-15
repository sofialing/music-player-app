import { useEffect, useState } from 'react';
import NewReleases from 'components/discover/NewReleases';
import FeaturedPlaylists from 'components/discover/FeaturedPlaylists';
import Categories from 'components/discover/Categories';
import Recommendations from 'components/discover/Recommendations';
import Spinner from 'components/partials/Spinner';
import Error from 'components/partials/Error';
import { useAuth } from 'contexts/AuthContext';
import { getFeaturedPlaylists, getNewReleases, getCategories, getRecommendations } from 'services/spotifyAPI';

import './Discover.scss';

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
				setError(true);
				setLoading(false);
				console.log(error)
			})
	}, [top_artists, top_tracks])

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <Error />;
	}

	return (
		<main id="discover" className="main-view">
			<header className="header">
				<h1 className="title">Discover new music</h1>
			</header>
			<Recommendations recommendations={recommendations} />
			<NewReleases releases={releases} />
			<FeaturedPlaylists playlists={featured.playlists} title={featured.message} />
			<Categories categories={categories} />
		</main>
	)
}

export default Discover;
