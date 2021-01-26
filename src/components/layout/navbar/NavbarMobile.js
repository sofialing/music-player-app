import { NavLink } from 'react-router-dom';
import AlbumIcon from '@material-ui/icons/Album';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth } from 'contexts/AuthContext';
import './NavbarMobile.scss';

const NavbarMobile = () => {
	const { user } = useAuth();
	return (
		<nav aria-label="Main menu" className="navbar-mobile">
			<ul className="menu">
				<li>
					<NavLink to={`/dashboard/${user && user.id}`}>
						<LibraryMusicIcon />
						<span>Library</span>
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
		</nav>
	)
}
export default NavbarMobile;
