import pageMissing from '../../assets/images/page-missing.png'

const NotFound = () => {
	return (
		<main className="main-view page-missing">
			<img src={pageMissing} alt="page is missing" />
			<p>Oh no! Page not found.</p>
		</main>
	)
}

export default NotFound
