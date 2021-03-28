import { useEffect } from 'react';
import Headphones from 'pages/login/Headphones';
import MainView from 'components/layout/views/MainView';

const Login = () => {
	const redirect = () => window.location.href = process.env.REACT_APP_BACKEND_URI;

	useEffect(() => {
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Log in';
	}, [])

	return (
		<MainView id="login">
			<Headphones />
			<button className="btn" onClick={redirect}>Log in</button>
			<small>Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></small>
		</MainView>
	);
}

export default Login;
