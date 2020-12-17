import { usePlayer } from '../../contexts/PlayerContext';

const Dashboard = () => {
	const { state } = usePlayer();

	return (
		<div>
			<h1>Dashboard - {state.user.display_name}</h1>
		</div>);
}

export default Dashboard;
