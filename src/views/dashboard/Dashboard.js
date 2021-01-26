import DiscoverWeekly from 'components/dashboard/DiscoverWeekly';
import Playlists from 'components/dashboard/Playlists';
import { useAuth } from 'contexts/AuthContext';
import './Dashboard.scss';

const Dashboard = () => {
	const { discover_weekly } = useAuth();

	return (
		<main id="dashboard" className="main-view">
			<header className="header">
				<h1 className="title">Your Music</h1>
			</header>
			{discover_weekly && <DiscoverWeekly />}
			<Playlists />
		</main>
	);
}

export default Dashboard;
