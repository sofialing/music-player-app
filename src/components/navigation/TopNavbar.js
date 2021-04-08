import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import usePlayer from 'hooks/usePlayer';
import UserModule from './UserModule';
const TopNavbar = () => {
	const { user, dispatch } = useAuth();
	const { disconnectPlayer } = usePlayer();
	const navigate = useNavigate();

	const logout = () => {
		// remove current user from auth context
		dispatch({ type: 'SET_USER', user: null });
		// close current session Web Playback SDK has with Spotify
		disconnectPlayer();
	};

	return user && (
		<header className="top-bar">
			<div className="top-bar__inner">
				<nav className="top-bar__nav">
					<button className="top-bar__nav--prev" aria-label="Go back" title="Go back" onClick={() => navigate(-1)}>
						<NavigateBeforeIcon />
					</button>
					<button className="top-bar__nav--forward" aria-label="Go forward" title="Go forward" onClick={() => navigate(1)}>
						<NavigateNextIcon />
					</button>
				</nav>
				<UserModule user={user} logout={logout} />
			</div>
		</header>
	)
}

export default TopNavbar;