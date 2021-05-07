import Headphones from 'pages/login/partials/Headphones';
import MainView from 'components/views/MainView';

const Login = () => {
	return (
		<MainView id="login" pageTitle="Log in">
			<Headphones />
			<a className="btn" href={process.env.REACT_APP_BACKEND_URI + 'login'}>Log in</a>
			<small>Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></small>
		</MainView>
	);
}

export default Login;
