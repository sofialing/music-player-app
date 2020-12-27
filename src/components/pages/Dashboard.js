import DiscoverWeekly from '../dashboard/DiscoverWeekly'
import Playlists from '../dashboard/Playlists'
import { usePlayer } from '../../contexts/PlayerContext'


const Dashboard = () => {
	const { discover_weekly } = usePlayer();
	return (
		<main className="dashboard-page">
			<header>
				<h1>Your Music</h1>
			</header>
			{discover_weekly && <DiscoverWeekly />}
			<Playlists />
		</main>
	);
}

export default Dashboard;
