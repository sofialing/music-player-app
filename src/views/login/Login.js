import LoginSvg from 'components/partials/LoginSvg'
import { loginWithSpotify } from 'spotify/login';
import './Login.scss';

const Login = () => {
	return (
		<main id="login" className="main-view">
			<LoginSvg />
			<button className="login-btn" onClick={loginWithSpotify}>
				Log in with spotify
			</button>
			<p className="text-small">Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></p>
		</main>
	);
}

export default Login;
