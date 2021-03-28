import { useEffect } from 'react';
import imgSrc from 'assets/images/page-missing.png';
import MainView from 'components/layout/views/MainView';

const PageMissing = () => {
	useEffect(() => {
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Page not found';
	}, [])

	return (
		<MainView id="page-missing">
			<a href="https://storyset.com/web">
				<img src={imgSrc} alt="page is missing" title="Illustration by Freepik Storyset" />
			</a>
			<p>Oh no! Page not found.</p>
		</MainView>
	)
}

export default PageMissing;
