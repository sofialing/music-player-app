import Headphones from 'pages/login/Headphones';
import MainView from 'components/views/MainView';

const Login = () => {
	const redirect = () => window.location.href = process.env.REACT_APP_BACKEND_URI;

	return (
		<MainView id="login" pageTitle="Log in">
			<Headphones />
			<button className="btn" onClick={redirect}>Log in</button>
			<small>Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></small>
		</MainView>
	);
}

export default Login;
