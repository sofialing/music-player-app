import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoute from 'decorators/AuthRoute'
import LoadingView from 'components/views/LoadingView';

// pages
const Album = lazy(() => import('pages/album/Album'));
const Artist = lazy(() => import('pages/artist/Artist'));
const Dashboard = lazy(() => import('pages/dashboard/Dashboard'));
const Discover = lazy(() => import('pages/discover/Discover'));
const Favorites = lazy(() => import('pages/favorites/Favorites'));
const Login = lazy(() => import('pages/login/Login'));
const PageMissing = lazy(() => import('pages/page-missing/PageMissing'));
const Playlist = lazy(() => import('pages/playlist/Playlist'));
const Redirect = lazy(() => import('pages/Redirect'));
const Search = lazy(() => import('pages/search/Search'));

// subpages
const Categories = lazy(() => import('pages/discover/subpages/Categories'));
const Category = lazy(() => import('pages/discover/subpages/Category'));
const Discography = lazy(() => import('pages/artist/subpages/Discography'));
const FeaturedPlaylists = lazy(() => import('pages/discover/subpages/FeaturedPlaylists'));
const NewReleases = lazy(() => import('pages/discover/subpages/NewReleases'));
const UserPlaylists = lazy(() => import('pages/dashboard/subpages/UserPlaylists'));
const FollowedArtists = lazy(() => import('pages/dashboard/subpages/FollowedArtists'));
const Recommendations = lazy(() => import('pages/discover/subpages/Recommendations'));
const RelatedArtists = lazy(() => import('pages/artist/subpages/RelatedArtists'));
const SearchResults = lazy(() => import('pages/search/subpages/SearchResults'));
const TopArtists = lazy(() => import('pages/favorites/subpages/TopArtists'));
const TopTracks = lazy(() => import('pages/favorites/subpages/TopTracks'));
const SavedAlbums = lazy(() => import('pages/dashboard/subpages/SavedAlbums'));

const AppRoutes = () => {
	return (
		<Suspense fallback={<LoadingView />}>
			<Routes>
				<Route path='/login' >
					<Login />
				</Route>
				<AuthRoute path='/' >
					<Dashboard />
				</AuthRoute>
				<AuthRoute path='dashboard' >
					<Route path='/' element={<Dashboard />} />
					<Route path='/playlists' element={<UserPlaylists />} />
					<Route path='/artists' element={<FollowedArtists />} />
					<Route path='/albums' element={<SavedAlbums />} />
				</AuthRoute>
				<AuthRoute path='discover' >
					<Route path='/' element={<Discover />} />
					<Route path='/recommendations' element={<Recommendations />} />
					<Route path='/new-releases' element={<NewReleases />} />
					<Route path='/featured-playlists' element={<FeaturedPlaylists />} />
					<Route path='/categories' element={<Categories />} />
					<Route path='/categories/:categoryId' element={<Category />} />
				</AuthRoute>
				<AuthRoute path='favorites' >
					<Route path='/' element={<Favorites />} />
					<Route path='/top-artists' element={<TopArtists />} />
					<Route path='/top-tracks' element={<TopTracks />} />
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
					<Route path='/:searchQuery/albums' element={<SearchResults type="albums" />} />
					<Route path='/:searchQuery/artists' element={<SearchResults type="artists" />} />
					<Route path='/:searchQuery/tracks' element={<SearchResults type="tracks" />} />
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
		</Suspense>
	)
}

export default AppRoutes;
