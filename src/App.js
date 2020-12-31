import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllAlbums from './components/search/AllAlbums'
import AllArtists from './components/search/AllArtists'
import AllCategories from './components/discover/AllCategories'
import AllDiscography from './components/artist/AllDiscography'
import AllFeaturedPlaylists from './components/discover/AllFeaturedPlaylists'
import AllNewReleases from './components/discover/AllNewReleases'
import AllPlaylists from './components/dashboard/AllPlaylists'
import AllRecommendedTracks from './components/discover/AllRecommendedTracks'
import AllRelatedArtists from './components/artist/AllRelatedArtists'
import AllTopArtists from './components/dashboard/AllTopArtists'
import AllTopTracks from './components/dashboard/AllTopTracks'
import AllTracks from './components/search/AllTracks'
import Artist from './components/pages/Artist'
import Dashboard from './components/pages/Dashboard'
import Discover from './components/pages/Discover'
import Favorites from './components/pages/Favorites'
import Login from './components/pages/Login'
import Navbar from './components/elements/Navbar'
import NotFound from './components/pages/NotFound'
import NowPlayingBar from './components/music-player/NowPlayingBar'
import NowPlayingModal from './components/music-player/NowPlayingModal'
import Playlist from './components/pages/Playlist'
import Redirect from './components/pages/Redirect'
import Search from './components/pages/Search'
import SingleAlbum from './components/pages/SingleAlbum'
import SingleCategory from './components/discover/SingleCategory'
import AuthContextProvider from './contexts/AuthContext'
import PlaybackContextProvider from './contexts/PlaybackContext'
import AuthRoute from './decorators/AuthRoute'
import ScrollToTop from './decorators/ScrollToTop'
import './assets/sass/main.scss'

const App = () => {
	return (
		<Router>
			<ScrollToTop />
			<AuthContextProvider>
				<PlaybackContextProvider >
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
					<NowPlayingModal />
					<NowPlayingBar />
				</PlaybackContextProvider>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
