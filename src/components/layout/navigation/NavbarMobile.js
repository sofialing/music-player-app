import { NavLink } from 'react-router-dom';
import AlbumIcon from '@material-ui/icons/Album';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

const NavbarMobile = () => {
	return (
		<nav aria-label="Main menu" className="navbar">
			<ul className="navbar__menu">
				<li className="navbar__menu--item">
					<NavLink to="/dashboard">
						<HomeIcon />
						<span>Home</span>
					</NavLink>
				</li>
				<li className="navbar__menu--item">
					<NavLink to="/favorites">
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
		</nav>
	)
}
export default NavbarMobile;
