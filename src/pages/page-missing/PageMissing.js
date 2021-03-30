import imgSrc from 'assets/images/page-missing.png';
import MainView from 'components/layout/views/MainView';

const PageMissing = () => {
	return (
		<MainView id="page-missing" pageTitle="Page not found">
			<a href="https://storyset.com/web">
				<img src={imgSrc} alt="page is missing" title="Illustration by Freepik Storyset" />
			</a>
			<p>Oh no! Page not found.</p>
		</MainView>
	)
}

export default PageMissing;
