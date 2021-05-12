import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { getRecentlyPlayed } from 'services/spotifyAPI';
import DiscoverCard from 'components/cards/DiscoverCard';
import ErrorView from 'components/views/ErrorView';
import PageHeader from 'components/sections/PageHeader';
import GridSection from 'components/sections/GridSection';
import MainView from 'components/views/MainView';
import LoadingView from 'components/views/LoadingView';

const Dashboard = () => {
	const { discover_weekly, followed_artists, saved_albums, user_playlists, user } = useAuth();
	const [recentlyPlayed, setRecentlyPlayed] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getRecentlyPlayed({ limit: 6 })
			.then(tracks => {
				setRecentlyPlayed(tracks);
				setLoading(false);
			}).catch(error => {
				setError(error);
				setLoading(false);
			})
	}, [])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="dashboard" pageTitle="Dashboard">
			<PageHeader title="Your music" />
			{discover_weekly && <DiscoverCard playlist={discover_weekly} user={user} />}
			<GridSection title="Recently played" link={null} items={recentlyPlayed.items} />
			<GridSection title="Playlists" link="playlists" items={user_playlists.items} />
			<GridSection title="Followed artists" link="artists" items={followed_artists.items} />
			<GridSection title="Saved albums" link="albums" items={saved_albums.items} />
		</MainView>
	);
}

export default Dashboard;
