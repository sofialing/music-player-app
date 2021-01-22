import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoginSvg from '../elements/LoginSvg'
import { loginWithSpotify } from '../../spotify/login';

const Login = () => {
	return (
		<main className="main-view login-page" >
			<LoginSvg />
			<button className="btn btn-login" onClick={() => window.location = process.env.REACT_APP_BACKEND_URI}><ExitToAppIcon /> Connect with Spotify</button>
		</main>
	);
}

export default Login;
