import pageMissing from 'assets/images/page-missing.png';

const Error = () => {
	return (
		<main className="main-view error-container">
			<img src={pageMissing} alt="page is missing" />
			<p>Oh no! Something went wrong, try again...</p>
			<button>Refresh page</button>
		</main>
	)
}

export default Error;
