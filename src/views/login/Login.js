import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginSvg from 'components/partials/LoginSvg';
import { useAuth } from 'contexts/AuthContext';
import './Login.scss';

const Login = () => {
	const navigate = useNavigate();
	const { isValidSession } = useAuth();

	useEffect(() => {
		if (!isValidSession()) {
			return;
		}
		const { access_token, refresh_token, expires_in } = JSON.parse(localStorage.getItem('token'));
		navigate(`/redirect?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
