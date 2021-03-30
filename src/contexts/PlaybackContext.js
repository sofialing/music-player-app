import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { reducer, initialState } from '../reducers/playbackReducer';
import { useAuth } from './AuthContext';


const PlaybackContext = createContext();

const usePlayback = () => {
	return useContext(PlaybackContext);
}

const PlaybackContextProvider = ({ children }) => {
	const { access_token } = useAuth();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [scriptLoaded, setScriptLoaded] = useState(false);

	const initSpotifySDK = () => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		document.body.appendChild(script);
		setScriptLoaded(true);
	}

	useEffect(() => {
		if (!scriptLoaded) {
			initSpotifySDK();
		}

		window.onSpotifyWebPlaybackSDKReady = () => {
			if (!access_token) {
				return;
			};

			const player = new window.Spotify.Player({
				name: 'React Music Player',
				getOAuthToken: cb => { cb(access_token); }
			});

			// Error handling
			player.addListener('initialization_error', ({ message }) => { console.error(message); });
			player.addListener('authentication_error', ({ message }) => { console.error(message); });
			player.addListener('account_error', ({ message }) => { console.error(message); });
			player.addListener('playback_error', ({ message }) => { console.error(message); });

			// Playback status updates
			player.addListener('player_state_changed', (state) => {
				if (!state) {
					dispatch({ type: 'SET_IS_PLAYING', is_playing: false });
					dispatch({ type: 'SET_CURRENT_TRACK', current_track: null });
					document.body.classList.remove('has-playing-bar');
					return;
				}
				const { context, position, paused, track_window: { current_track } } = state;
				dispatch({ type: 'SET_CURRENT_POSITION', current_position: position });
				dispatch({ type: 'SET_IS_PLAYING', is_playing: !paused });
				dispatch({ type: 'SET_CURRENT_TRACK', current_track });
				dispatch({ type: 'SET_CONTEXT', context });
				if (current_track) {
					document.body.classList.add('has-playing-bar');
				} else {
					document.body.classList.remove('has-playing-bar');
				}
			});

			// Ready
			player.addListener('ready', ({ device_id }) => {
				dispatch({ type: 'SET_DEVICE_ID', device_id })
			});

			// Not Ready
			player.addListener('not_ready', () => {
				dispatch({ type: 'SET_DEVICE_ID', device_id: null })
			});

			// Connect to the player!
			player.connect().then(success => {
				if (success) {
					console.log('The Web Playback SDK successfully connected to Spotify!');
					dispatch({ type: 'SET_PLAYER', player })
				}
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [access_token])

	return (
		<PlaybackContext.Provider value={{ ...state, dispatch }}>
			{children}
		</PlaybackContext.Provider>
	)
}

export { usePlayback, PlaybackContext, PlaybackContextProvider as default }
