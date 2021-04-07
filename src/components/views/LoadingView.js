import MainView from 'components/views/MainView';

const LoadingView = () => {
	return (
		<MainView id="loading">
			<div className="spinner" role="status" aria-label="Page is loading, do not refresh"><div></div><div></div><div></div><div></div></div>
		</MainView>
	)
}

export default LoadingView;
