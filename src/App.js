import { Routes, Route } from 'react-router-dom';
// contexts
import AuthContextProvider from 'contexts/AuthContext';
import PlaybackContextProvider from 'contexts/PlaybackContext';
import ViewportContextProvider from 'contexts/ViewportContext';

// layout
import Navbar from 'components/layout/navbar/Navbar';
import NowPlayingBar from 'components/layout/music-player/NowPlayingBar';
import NowPlayingModal from 'components/layout/music-player/NowPlayingModal';

// pages
import Album from 'views/album/Album';
import Artist from 'views/artist/Artist';
import Dashboard from 'views/dashboard/Dashboard';
import Discover from 'views/discover/Discover';
import Favorites from 'views/favorites/Favorites';
import Login from 'views/login/Login';
import PageMissing from 'views/page-missing/PageMissing';
import Playlist from 'views/playlist/Playlist';
import Redirect from 'views/Redirect';
import Search from 'views/search/Search';

// subviews
import Categories from 'views/discover/subviews/Categories';
import Category from 'views/discover/subviews/Category';
import Discography from 'views/artist/subviews/Discography';
import FeaturedPlaylists from 'views/discover/subviews/FeaturedPlaylists';
import NewReleases from 'views/discover/subviews/NewReleases';
import Playlists from 'views/dashboard/subviews/Playlists';
import RecommendedTracks from 'views/discover/subviews/RecommendedTracks';
import RelatedArtists from 'views/artist/subviews/RelatedArtists';
import SearchAlbums from 'views/search/subviews/SearchAlbums';
import SearchArtists from 'views/search/subviews/SearchArtists';
import SearchTracks from 'views/search/subviews/SearchTracks';
import TopArtists from 'views/favorites/subviews/TopArtists';
import TopTracks from 'views/favorites/subviews/TopTracks';

// misc
import AuthRoute from 'decorators/AuthRoute'
import 'assets/sass/main.scss'

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
							<Route path='/:userId/playlists' element={<Playlists />} />
						</AuthRoute>
						<AuthRoute path='discover' >
							<Route path='/' element={<Discover />} />
							<Route path='/recommended-tracks' element={<RecommendedTracks />} />
							<Route path='/new-releases' element={<NewReleases />} />
							<Route path='/featured-playlists' element={<FeaturedPlaylists />} />
							<Route path='/categories' element={<Categories />} />
							<Route path='/categories/:categoryId' element={<Category />} />
						</AuthRoute>
						<AuthRoute path='favorites' >
							<Route path='/:userId' element={<Favorites />} />
							<Route path='/:userId/top-artists' element={<TopArtists />} />
							<Route path='/:userId/top-tracks' element={<TopTracks />} />
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
							<Route path='/:searchQuery/albums' element={<SearchAlbums />} />
							<Route path='/:searchQuery/artists' element={<SearchArtists />} />
							<Route path='/:searchQuery/tracks' element={<SearchTracks />} />
						</AuthRoute>
						<AuthRoute path='artist' >
							<Route path='/:artistId' element={<Artist />} />
							<Route path='/:artistId/discography' element={<Discography />} />
							<Route path='/:artistId/related' element={<RelatedArtists />} />
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
