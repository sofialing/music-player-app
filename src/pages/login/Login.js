import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'utils'
import Headphones from 'pages/login/partials/Headphones';
import MainView from 'components/views/MainView';

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// check for access token and refresh token in local storage
		const token = getToken();

		if (!token) {
			return;
		}

		// navigate to redirect
		const queryParams = new URLSearchParams(token).toString()
		navigate(`/redirect?${queryParams}`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<MainView id="login" pageTitle="Log in">
			<Headphones />
			<a className="btn" href={process.env.REACT_APP_BACKEND_URI + 'login'}>Log in</a>
			<small>Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></small>
		</MainView>
	);
}

export default Login;
