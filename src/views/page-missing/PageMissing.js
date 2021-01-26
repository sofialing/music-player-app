import pageMissing from 'assets/images/page-missing.png';
import './PageMissing.scss';

const PageMissing = () => {
	return (
		<main id="page-missing" className="main-view">
			<img src={pageMissing} alt="page is missing" />
			<p>Oh no! Page not found.</p>
		</main>
	)
}

export default PageMissing;
