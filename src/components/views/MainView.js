import { useEffect } from 'react';

const MainView = ({ children, id, pageTitle = null }) => {
	useEffect(() => {
		if (!pageTitle) return;
		document.title = process.env.REACT_APP_PAGE_TITLE + pageTitle;
	}, [pageTitle])

	return (
		<main id={id} className="main-view">
			{children}
		</main>
	)
}

export default MainView;
