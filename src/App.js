import { Routes, Route } from 'react-router-dom';
// contexts
import AuthContextProvider from './contexts/AuthContext';
import PlaybackContextProvider from './contexts/PlaybackContext';
import ViewportContextProvider from './contexts/ViewportContext';

// layout
import Navbar from './components/layout/navbar';
import NowPlayingBar from './components/music-player/NowPlayingBar';
import NowPlayingModal from './components/music-player/NowPlayingModal';

// pages
import Album from './views/album/Album';
import Artist from './views/artist/Artist';
import Dashboard from './views/dashboard/Dashboard';
import Discover from './views/discover/Discover';
import Favorites from './views/favorites/Favorites';
import Login from './views/login/Login';
import PageMissing from './views/page-missing/PageMissing';
import Playlist from './views/playlist/Playlist';
import Redirect from './views/Redirect';
import Search from './views/search/Search';

// sub pages
import AllAlbums from './components/search/AllAlbums';
import AllArtists from './components/search/AllArtists';
import AllCategories from './components/discover/AllCategories';
import AllDiscography from './components/artist/AllDiscography';
import AllFeaturedPlaylists from './components/discover/AllFeaturedPlaylists';
import AllNewReleases from './components/discover/AllNewReleases';
import AllPlaylists from './components/dashboard/AllPlaylists';
import AllRecommendedTracks from './components/discover/AllRecommendedTracks';
import AllRelatedArtists from './components/artist/AllRelatedArtists';
import AllTopArtists from './components/dashboard/AllTopArtists';
import AllTopTracks from './components/dashboard/AllTopTracks';
import AllTracks from './components/search/AllTracks';
import SingleCategory from './components/discover/SingleCategory';

// misc
import AuthRoute from './decorators/AuthRoute'
import './assets/sass/main.scss'

const App = () => {
	return (
		<AuthContextProvider>
			<PlaybackContextProvider >
				<ViewportContextProvider>
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
							<Route path='/:albumId' element={<Album />} />
						</AuthRoute>
						<Route path='*' element={<PageMissing />} />
					</Routes>
					<NowPlayingModal />
					<NowPlayingBar />
				</ViewportContextProvider>
			</PlaybackContextProvider>
		</AuthContextProvider>
	);
}

export default App;
