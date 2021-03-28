import AuthContextProvider from 'contexts/AuthContext';
import PlaybackContextProvider from 'contexts/PlaybackContext';
import ViewportContextProvider from 'contexts/ViewportContext';
import Navbar from 'components/layout/navigation/Navbar';
import NowPlayingBar from 'components/layout/now-playing/NowPlayingBar';
import NowPlayingModal from 'components/layout/now-playing/NowPlayingModal';
import AppRoutes from 'routes/AppRoutes';
import TopNavbar from 'components/layout/navigation/TopNavbar';

const App = () => {
	return (
		<AuthContextProvider>
			<PlaybackContextProvider >
				<ViewportContextProvider>
					<Navbar />
					<TopNavbar />
					<AppRoutes />
					<NowPlayingModal />
					<NowPlayingBar />
				</ViewportContextProvider>
			</PlaybackContextProvider>
		</AuthContextProvider>
	);
}

export default App;
