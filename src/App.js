import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerContextProvider from './contexts/PlayerContext'
import AuthRoute from './components/AuthRoute'
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Redirect from './components/pages/Redirect';
import Playlist from './components/pages/Playlist';
import Search from './components/pages/Search';
import NowPlayingBar from './components/NowPlayingBar';
import Navbar from './components/Navbar';
import './assets/sass/main.scss';

const App = () => {
	return (
		<Router>
			<PlayerContextProvider>
				<Routes>
					<Route path="/" >
						<Login />
					</Route>
					<AuthRoute path="/library" >
						<Dashboard />
					</AuthRoute>
					<Route path="/redirect" >
						<Redirect />
					</Route>
					<AuthRoute path="/playlist/:playlistId" >
						<Playlist />
					</AuthRoute>
					<AuthRoute path="/search/" >
						<Search />
					</AuthRoute>
				</Routes>
				<NowPlayingBar />
				<Navbar />
			</PlayerContextProvider>
		</Router>
	);
}

export default App;
