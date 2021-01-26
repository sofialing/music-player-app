const MainWrapper = ({ id, children }) => {
	return (
		<main className="main-view" id={id}>
			{children}
		</main>
	)
}

export default MainWrapper;
