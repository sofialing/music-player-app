import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerContextProvider from './contexts/PlayerContext'
import AuthRoute from './components/AuthRoute'
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Redirect from './components/pages/Redirect';
import Playlist from './components/pages/Playlist';
import Search from './components/pages/Search';
import Artist from './components/pages/Artist';
import NowPlayingBar from './components/NowPlayingBar';
import Navbar from './components/Navbar';
import './assets/sass/main.scss';
import AllAlbums from './components/search/AllAlbums';
import AllArtists from './components/search/AllArtists';
import AllTracks from './components/search/AllTracks';
import ArtistDiscography from './components/artists/discography/ArtistDiscography';

const App = () => {
	return (
		<Router>
			<PlayerContextProvider>
				<Navbar />
				<Routes>
					<Route path='/' >
						<Login />
					</Route>
					<AuthRoute path='library' >
						<Dashboard />
					</AuthRoute>
					<Route path='redirect' >
						<Redirect />
					</Route>
					<AuthRoute path='playlist/:playlistId' >
						<Playlist />
					</AuthRoute>
					<AuthRoute path='search' >
						<Route path='/' element={<Search />} />
						<Route path='/:searchQuery' element={<Search />} />
						<Route path='/:searchQuery/albums' element={<AllAlbums />} />
						<Route path='/:searchQuery/artists' element={<AllArtists />} />
						<Route path='/:searchQuery/tracks' element={<AllTracks />} />
					</AuthRoute>
					<AuthRoute path='artists' >
						<Route path='/:artistId' element={<Artist />} />
						<Route path='/:artistId/discography' element={<ArtistDiscography />} />
						<Route path='/:artistId/related' element={<p>Related artists</p>} />
					</AuthRoute>
				</Routes>
				{/* <NowPlayingBar /> */}
			</PlayerContextProvider>
		</Router>
	);
}

export default App;
