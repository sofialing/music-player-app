import { accessUrl } from '../../auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import bgImg from '../../assets/images/music-bg.png';

const Login = () => {
	return (
		<main className="login-page" style={{ 'backgroundImage': `url(${bgImg})` }}>
			<h1>Lorem ipsum dolor sit amet.</h1>
			<p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<a className="btn btn-login" href={accessUrl}><ExitToAppIcon />Connect with Spotify</a>
		</main>
	);
}

export default Login;
