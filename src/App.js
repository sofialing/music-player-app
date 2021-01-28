import AuthContextProvider from 'contexts/AuthContext';
import PlaybackContextProvider from 'contexts/PlaybackContext';
import ViewportContextProvider from 'contexts/ViewportContext';
import Navbar from 'components/layout/navbar/Navbar';
import NowPlayingBar from 'components/layout/NowPlayingBar';
import NowPlayingModal from 'components/layout/NowPlayingModal';
import AppRoutes from 'AppRoutes';
import 'assets/sass/main.scss';

const App = () => {
	return (
		<AuthContextProvider>
			<PlaybackContextProvider >
				<ViewportContextProvider>
					<Navbar />
					<AppRoutes />
					{/* <NowPlayingModal /> */}
					<NowPlayingBar />
				</ViewportContextProvider>
			</PlaybackContextProvider>
		</AuthContextProvider>
	);
}

export default App;
