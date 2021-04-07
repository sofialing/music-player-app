import AuthContextProvider from 'contexts/AuthContext';
import PlaybackContextProvider from 'contexts/PlaybackContext';
import ViewportContextProvider from 'contexts/ViewportContext';
import Navbar from 'components/navigation/Navbar';
import NowPlayingBar from 'components/now-playing-bar/NowPlayingBar';
import AppRoutes from 'routes/AppRoutes';
import TopNavbar from 'components/navigation/TopNavbar';

const App = () => {
	return (
		<AuthContextProvider>
			<PlaybackContextProvider >
				<ViewportContextProvider>
					<Navbar />
					<TopNavbar />
					<AppRoutes />
					<NowPlayingBar />
				</ViewportContextProvider>
			</PlaybackContextProvider>
		</AuthContextProvider>
	);
}

export default App;
