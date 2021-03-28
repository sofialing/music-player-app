import { useNavigate } from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useAuth } from 'contexts/AuthContext';
import UserModule from './UserModule';

const TopNavbar = () => {
	const { user, dispatch } = useAuth();
	const navigate = useNavigate();
	const logout = () => dispatch({ type: 'SET_USER', user: null });

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
