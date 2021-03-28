import { Routes, Route } from 'react-router-dom';
import AuthRoute from 'decorators/AuthRoute'

// pages
import Album from 'pages/album/Album';
import Artist from 'pages/artist/Artist';
import Dashboard from 'pages/dashboard/Dashboard';
import Discover from 'pages/discover/Discover';
import Favorites from 'pages/favorites/Favorites';
import Login from 'pages/login/Login';
import PageMissing from 'pages/page-missing/PageMissing';
import Playlist from 'pages/playlist/Playlist';
import Redirect from 'pages/Redirect';
import Search from 'pages/search/Search';

// subpages
import Categories from 'pages/discover/subpages/Categories';
import Category from 'pages/discover/subpages/Category';
import Discography from 'pages/artist/subpages/Discography';
import FeaturedPlaylists from 'pages/discover/subpages/FeaturedPlaylists';
import NewReleases from 'pages/discover/subpages/NewReleases';
import UserPlaylists from 'pages/dashboard/subpages/UserPlaylists';
import FollowedArtists from 'pages/dashboard/subpages/FollowedArtists';
import Recommendations from 'pages/discover/subpages/Recommendations';
import RelatedArtists from 'pages/artist/subpages/RelatedArtists';
import SearchResults from 'pages/search/subpages/SearchResults';
import TopArtists from 'pages/favorites/subpages/TopArtists';
import TopTracks from 'pages/favorites/subpages/TopTracks';
import SavedAlbums from 'pages/dashboard/subpages/SavedAlbums';

const AppRoutes = () => {
	return (
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
	)
}

export default AppRoutes;
