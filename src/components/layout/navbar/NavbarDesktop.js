import { Link, NavLink } from 'react-router-dom';
import AlbumIcon from '@material-ui/icons/Album';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth } from 'contexts/AuthContext';
import logo from 'assets/images/remusic-logo.svg';
import './NavbarDesktop.scss';

const NavbarDesktop = () => {
	const { user, user_playlists } = useAuth();
	return (
		<nav aria-label="Main menu" className="navbar-desktop">
			<Link className="logo" to={`/dashboard/${user && user.id}`}>
				<img src={logo} alt="logo" />
			</Link>
			<ul className="menu">
				<li>
					<NavLink to={`/dashboard/${user && user.id}`}>
						<HomeIcon />
						<span>Dashboard</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={`/favorites/${user && user.id}`}>
						<FavoriteBorderIcon />
						<span>Favorites</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/discover">
						<AlbumIcon />
						<span>Discover</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/search">
						<SearchIcon />
						<span>Search</span>
					</NavLink>
				</li>
			</ul>
			<div className="playlists" aria-label="User playlists">
				<h1>Playlists</h1>
				{user ? (
					<ul>
						{user_playlists && user_playlists.total ? user_playlists.items.map(playlist => (
							<li key={playlist.id}>
								<Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
							</li>
						)) : <p>No playlists to display</p>}
					</ul>) : (<p>Log in to view your playlists</p>)}
			</div>
		</nav>
	)
}

export default NavbarDesktop;
