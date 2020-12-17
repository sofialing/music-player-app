import { accessUrl } from '../../spotify/auth';

const Login = () => {
	return (
		<div className="login-page">
			<a href={accessUrl}>Login to Spotify</a>
		</div>
	);
}

export default Login;
