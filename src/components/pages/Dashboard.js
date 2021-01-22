import DiscoverWeekly from '../dashboard/DiscoverWeekly'
import Playlists from '../dashboard/Playlists'
import { useAuth } from '../../contexts/AuthContext'


const Dashboard = () => {
	const { discover_weekly } = useAuth();
	return (
		<main className="main-view dashboard-page">
			<header>
				<h1>Your Music</h1>
			</header>
			{discover_weekly && <DiscoverWeekly />}
			<Playlists />
		</main>
	);
}

export default Dashboard;
