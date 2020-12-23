import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerContextProvider from './contexts/PlayerContext'
import AuthRoute from './components/AuthRoute'
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Redirect from './components/pages/Redirect';
import Playlist from './components/pages/Playlist';
import Search from './components/pages/Search';
import SingleAlbum from './components/pages/SingleAlbum';
import SingleArtist from './components/pages/SingleArtist';
import NowPlayingBar from './components/elements/NowPlayingBar';
import Navbar from './components/elements/Navbar';
import './assets/sass/main.scss';
import AllAlbums from './components/search/AllAlbums';
import AllArtists from './components/search/AllArtists';
import AllTracks from './components/search/AllTracks';
import ArtistDiscography from './components/artists/discography/ArtistDiscography';
import AllRelatedArtists from './components/artists/related-artists/AllRelatedArtists';
import TopArtistsAll from './components/dashboard/TopArtistsAll';
import TopTracksAll from './components/dashboard/TopTracksAll';
import PlaylistsAll from './components/dashboard/PlaylistsAll';

const App = () => {
	return (
		<Router>
			<PlayerContextProvider>
				<Navbar />
				<Routes>
					<Route path='/' >
						<Login />
					</Route>
					<AuthRoute path='dashboard' >
						<Route path='/:userId' element={<Dashboard />} />
						<Route path='/:userId/playlists' element={<PlaylistsAll />} />
						<Route path='/:userId/top-artists' element={<TopArtistsAll />} />
						<Route path='/:userId/top-tracks' element={<TopTracksAll />} />

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
						<Route path='/:artistId' element={<SingleArtist />} />
						<Route path='/:artistId/discography' element={<ArtistDiscography />} />
						<Route path='/:artistId/related' element={<AllRelatedArtists />} />
					</AuthRoute>
					<AuthRoute path='album' >
						<Route path='/:albumId' element={<SingleAlbum />} />
					</AuthRoute>
				</Routes>
				<NowPlayingBar />
			</PlayerContextProvider>
		</Router>
	);
}

export default App;
