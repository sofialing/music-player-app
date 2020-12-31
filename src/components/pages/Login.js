import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import image from '../../assets/images/headphone.png';
import { loginWithSpotify } from '../../spotify/login';

const Login = () => {
	return (
		<main className="login-page" >
			<img src={image} alt="" />
			<button className="btn btn-login" onClick={loginWithSpotify}><ExitToAppIcon /> Connect with Spotify</button>
		</main>
	);
}

export default Login;
