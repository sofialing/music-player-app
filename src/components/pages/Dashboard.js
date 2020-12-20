import { useEffect } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import Playlists from '../dashboard/Playlists';
import Navbar from '../Navbar'

const Dashboard = () => {
	const { } = usePlayer();
	useEffect(() => {
	}, [])

	return (
		<div className="container">
			<h1>Your music</h1>
			<Playlists />
		</div>);
}

export default Dashboard;
