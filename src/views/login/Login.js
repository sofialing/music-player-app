import LoginSvg from 'components/partials/LoginSvg'
import './Login.scss';

const Login = () => {
	return (
		<main id="login" className="main-view">
			<LoginSvg />
			<button className="login-btn" onClick={() => window.location = process.env.REACT_APP_BACKEND_URI}>
				Log in with spotify
			</button>
			<p className="text-small">Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></p>
		</main>
	);
}

export default Login;
