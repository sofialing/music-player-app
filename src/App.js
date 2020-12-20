import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerContextProvider from './contexts/PlayerContext'
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Redirect from './components/pages/Redirect';
import Playlist from './components/pages/Playlist';
import Search from './components/pages/Search';
import './assets/sass/main.scss';


const App = () => {
	return (
		<Router>
			<PlayerContextProvider>
				<Routes>
					<Route path="/" >
						<Login />
					</Route>
					<Route path="/library" >
						<Dashboard />
					</Route>
					<Route path="/redirect" >
						<Redirect />
					</Route>
					<Route path="/playlist/:playlistId" >
						<Playlist />
					</Route>
					<Route path="/search/" >
						<Search />
					</Route>
				</Routes>
			</PlayerContextProvider>
		</Router>
	);
}

export default App;
