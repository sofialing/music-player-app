import DiscoverWeekly from '../dashboard/DiscoverWeekly'
import Playlists from '../dashboard/Playlists'
import TopArtists from '../dashboard/TopArtists'
import TopTracks from '../dashboard/TopTracks'
import { usePlayer } from '../../contexts/PlayerContext'


const Dashboard = () => {
	const { discover_weekly } = usePlayer();
	return (
		<main className="dashboard-page">
			<header>
				<h1>Your Music</h1>
			</header>
			{discover_weekly && <DiscoverWeekly />}
			<TopArtists />
			<TopTracks />
			<Playlists />
		</main>);
}

export default Dashboard;
