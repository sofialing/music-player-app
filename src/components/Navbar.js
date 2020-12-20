import { NavLink } from 'react-router-dom';
import AlbumIcon from '@material-ui/icons/Album';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';

const Navbar = () => {
	return (
		<nav className="navbar container">
			<ul>
				<li>
					<NavLink to="/library">
						<LibraryMusicIcon />
						<small>Library</small>
					</NavLink>
				</li>
				<li>
					<NavLink to="/discovery">
						<AlbumIcon />
						<small>Discover</small>
					</NavLink>
				</li>
				<li>
					<NavLink to="/favorites">
						<FavoriteBorderIcon />
						<small>Favorites</small>
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
