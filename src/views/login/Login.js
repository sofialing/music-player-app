import './Login.scss';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoginSvg from '../../components/partials/LoginSvg'
import { loginWithSpotify } from '../../spotify/login';

const Login = () => {
	return (
		<main id="login" className="main-view">
			<LoginSvg />
			<button className="login-btn" onClick={loginWithSpotify}>
				<ExitToAppIcon /> Connect with Spotify
			</button>
		</main>
	);
}

export default Login;
