import { Link } from 'react-router-dom';
import AlbumIcon from '@material-ui/icons/Album';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';

const Navbar = () => {
	return (
		<nav className="navbar container">
			<ul>
				<li>
					<Link to="/library">
						<LibraryMusicIcon />
						<small>Library</small>
					</Link>
				</li>
				<li>
					<Link to="/discovery">
						<AlbumIcon />
						<small>Discover</small>
					</Link>
				</li>
				<li>
					<Link to="/favorites">
						<FavoriteBorderIcon />
						<small>Favorites</small>
					</Link>
				</li>
				<li>
					<Link to="/search">
						<SearchIcon />
						<small>Search</small>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
