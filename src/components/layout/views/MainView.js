const MainView = ({ children, id, styles = null }) => {
	return (
		<main id={id} className="main-view" style={styles}>
			{children}
		</main>
	)
}

export default MainView;
