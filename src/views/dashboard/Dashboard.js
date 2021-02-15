import { useEffect, useState } from 'react';
import Albums from 'components/dashboard/Albums';
import Artists from 'components/dashboard/Artists';
import DiscoverWeekly from 'components/dashboard/DiscoverWeekly';
import Playlists from 'components/dashboard/Playlists';
import Spinner from 'components/partials/Spinner';
import { useAuth } from 'contexts/AuthContext';
import { getUsersSavedAlbums, getFollowedArtists } from 'services/spotifyAPI';
import './Dashboard.scss';

const Dashboard = () => {
	const { discover_weekly, user_playlists, user } = useAuth();
	const [artists, setArtists] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const FETCH_DATA = [
			getUsersSavedAlbums(),
			getFollowedArtists()
		];
		Promise.all(FETCH_DATA)
			.then(data => {
				const [albums, artists] = data;
				setAlbums(albums);
				setArtists(artists);
				setLoading(false);
			})
			.catch(error => console.log(error))
	}, [])

	if (loading) {
		return <Spinner />;
	}

	return (
		<main id="dashboard" className="main-view">
			<header className="header">
				<h1 className="title">Your Music</h1>
			</header>
			<DiscoverWeekly playlist={discover_weekly} user={user} />
			<Playlists playlists={user_playlists} />
			<Artists artists={artists} />
			<Albums albums={albums} />
		</main>
	);
}

export default Dashboard;
