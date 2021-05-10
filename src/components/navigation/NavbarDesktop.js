import { Link, NavLink } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import AlbumIcon from '@material-ui/icons/Album';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import logo from 'assets/images/remusic-logo.svg';
import UserPlaylists from './UserPlaylists';

const NavbarDesktop = () => {
	const { user, user_playlists } = useAuth();
	return (
		<nav aria-label="Main menu" className="navbar navbar-desktop">
			<Link to='/'><img className="navbar__logo" src={logo} alt="logo" width="250" height="48" /></Link>
			<ul className="navbar__menu">
				<li className="navbar__menu--item">
					<NavLink to='/dashboard'>
						<HomeIcon />
						<span>Dashboard</span>
					</NavLink>
				</li>
				<li className="navbar__menu--item">
					<NavLink to='/favorites'>
						<FavoriteBorderIcon />
						<span>Favorites</span>
					</NavLink>
				</li>
				<li className="navbar__menu--item">
					<NavLink to="/discover">
						<AlbumIcon />
						<span>Discover</span>
					</NavLink>
				</li>
				<li className="navbar__menu--item">
					<NavLink to="/search">
						<SearchIcon />
						<span>Search</span>
					</NavLink>
				</li>
			</ul>
			<div className="navbar__playlists" aria-label="User playlists">
				<h1 className="navbar__playlists--title">Playlists</h1>
				{user ? <UserPlaylists user_playlists={user_playlists} /> : <p>Log in to view your playlists.</p>}
			</div>
		</nav>
	)
}

export default NavbarDesktop;
