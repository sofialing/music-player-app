import { useNavigate } from 'react-router-dom';
import error from 'assets/images/error.svg';
import './Error.scss';

const Error = () => {
	const navigate = useNavigate();
	return (
		<main id="error" className="main-view">
			<a href="https://storyset.com/web">
				<img src={error} alt="Bug fixing Cartoon" title="Illustration by Freepik Storyset" />
			</a>
			<p>Oh no! Something went wrong, try again...</p>
			<button onClick={() => navigate(-1)}>Go back</button>
		</main>
	)
}

export default Error;
