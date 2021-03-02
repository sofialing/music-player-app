import pageMissing from 'assets/images/page-missing.png';
import './PageMissing.scss';

const PageMissing = () => {
	return (
		<main id="page-missing" className="main-view">
			<a href="https://storyset.com/web">
				<img src={pageMissing} alt="page is missing" title="Illustration by Freepik Storyset" />
			</a>
			<p>Oh no! Page not found.</p>
		</main>
	)
}

export default PageMissing;
