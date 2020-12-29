import { NavLink } from 'react-router-dom';
import AlbumIcon from '@material-ui/icons/Album';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
	const { user } = useAuth();
	return (
		<nav className="navbar container">
			<ul>
				<li>
					<NavLink to={`/dashboard/${user && user.id}`}>
						<LibraryMusicIcon />
						<small>Library</small>
					</NavLink>
				</li>
				<li>
					<NavLink to={`/favorites/${user && user.id}`}>
						<FavoriteBorderIcon />
						<small>Favorites</small>
					</NavLink>
				</li>
				<li>
					<NavLink to="/discover">
						<AlbumIcon />
						<small>Discover</small>
					</NavLink>
				</li>
				<li>
					<NavLink to="/search">
						<SearchIcon />
						<small>Search</small>
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
