import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoginSvg from '../elements/LoginSvg'
import { loginWithSpotify } from '../../spotify/login';

const Login = () => {
	return (
		<main className="login-page" >
			<LoginSvg />
			<button className="btn btn-login" onClick={loginWithSpotify}><ExitToAppIcon /> Connect with Spotify</button>
		</main>
	);
}

export default Login;
