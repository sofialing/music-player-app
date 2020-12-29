import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import bgImg from '../../assets/images/music-bg.png';
import { loginWithSpotify } from '../../spotify/login';

const Login = () => {
	return (
		<main className="login-page" style={{ 'backgroundImage': `url(${bgImg})` }}>
			<h1>Lorem ipsum dolor sit amet.</h1>
			<p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<button className="btn btn-login" onClick={loginWithSpotify}><ExitToAppIcon /> Login with Spotify</button>
		</main>
	);
}

export default Login;
