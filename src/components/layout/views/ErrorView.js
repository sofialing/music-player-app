import { useNavigate } from 'react-router-dom';
import imgSrc from 'assets/images/error.svg';
import MainView from 'components/layout/views/MainView';

const Error = () => {
	const navigate = useNavigate();

	return (
		<MainView id="error" pageTitle="Oh no!">
			<a href="https://storyset.com/web">
				<img src={imgSrc} alt="Bug fixing Cartoon" title="Illustration by Freepik Storyset" />
			</a>
			<p>Oh no! Something went wrong, try again...</p>
			<button className="btn" onClick={() => navigate(-1)}>Go back</button>
		</MainView>
	)
}

export default Error;
