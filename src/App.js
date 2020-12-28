import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayerContextProvider from './contexts/PlayerContext'
import AuthRoute from './components/AuthRoute'
import Dashboard from './components/pages/Dashboard';
import Favorites from './components/pages/Favorites';
import Login from './components/pages/Login';
import Redirect from './components/pages/Redirect';
import Playlist from './components/pages/Playlist';
import Search from './components/pages/Search';
import SingleAlbum from './components/pages/SingleAlbum';
import Artist from './components/pages/Artist';
import NowPlayingBar from './components/elements/NowPlayingBar';
import Navbar from './components/elements/Navbar';
import './assets/sass/main.scss';
import AllAlbums from './components/search/AllAlbums';
import AllArtists from './components/search/AllArtists';
import AllTracks from './components/search/AllTracks';
import AllDiscography from './components/artist/AllDiscography';
import AllRelatedArtists from './components/artist/AllRelatedArtists';
import AllTopArtists from './components/dashboard/AllTopArtists';
import AllTopTracks from './components/dashboard/AllTopTracks';
import AllPlaylists from './components/dashboard/AllPlaylists';
import NotFound from './components/pages/NotFound';
import Discover from './components/pages/Discover';
import AllRecommendedTracks from './components/discover/AllRecommendedTracks';
import AllNewReleases from './components/discover/AllNewReleases';
import AllFeaturedPlaylists from './components/discover/AllFeaturedPlaylists';
import AllCategories from './components/discover/AllCategories';
import SingleCategory from './components/discover/SingleCategory';

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
						<Route path='/:userId/playlists' element={<AllPlaylists />} />
					</AuthRoute>
					<AuthRoute path='discover' >
						<Route path='/' element={<Discover />} />
						<Route path='/recommended-tracks' element={<AllRecommendedTracks />} />
						<Route path='/new-releases' element={<AllNewReleases />} />
						<Route path='/featured-playlists' element={<AllFeaturedPlaylists />} />
						<Route path='/categories' element={<AllCategories />} />
						<Route path='/categories/:categoryId' element={<SingleCategory />} />
					</AuthRoute>
					<AuthRoute path='favorites' >
						<Route path='/:userId' element={<Favorites />} />
						<Route path='/:userId/top-artists' element={<AllTopArtists />} />
						<Route path='/:userId/top-tracks' element={<AllTopTracks />} />
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
					<AuthRoute path='artist' >
						<Route path='/:artistId' element={<Artist />} />
						<Route path='/:artistId/discography' element={<AllDiscography />} />
						<Route path='/:artistId/related' element={<AllRelatedArtists />} />
					</AuthRoute>
					<AuthRoute path='album' >
						<Route path='/:albumId' element={<SingleAlbum />} />
					</AuthRoute>
					<Route path='*' element={<NotFound />} />
				</Routes>
				<NowPlayingBar />
			</PlayerContextProvider>
		</Router>
	);
}

export default App;
