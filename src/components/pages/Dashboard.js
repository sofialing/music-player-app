import { useEffect } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import Playlists from '../dashboard/Playlists';
import Navbar from '../Navbar'
import NowPlayingBar from '../NowPlayingBar';
import NowPlayingModal from '../NowPlayingModal';

const Dashboard = () => {
	const { } = usePlayer();
	useEffect(() => {
	}, [])

	return (
		<div className="container">
			<h1>Your music</h1>
			<Playlists />
			{/* <NowPlayingModal /> */}
			<NowPlayingBar />
			<Navbar />
		</div>);
}

export default Dashboard;
