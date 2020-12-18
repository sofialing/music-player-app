import { accessUrl } from '../../spotify/auth';
import bgImg from '../../assets/images/music-bg.png';
const Login = () => {
	return (
		<div className="login" style={{ 'backgroundImage': `url(${bgImg})` }}>
			<h1>Lorem ipsum dolor sit amet.</h1>
			<p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<a className="btn btn-login" href={accessUrl}>Connect with Spotify</a>
		</div>
	);
}

export default Login;
