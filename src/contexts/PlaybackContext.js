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
				// check of state is null
				if (!state) {
					document.body.classList.remove('has-now-playing-bar');
					return dispatch({ type: 'SET_PLAYBACK_STATE', playback_state: initialState.playback_state });
				}
				// console.log('player_state_changed', state);
				dispatch({
					type: 'SET_PLAYBACK_STATE', playback_state: {
						context: state.context,
						current_position: state.position,
						is_playing: !state.paused,
						current_track: state.track_window.current_track,
						next_tracks: state.track_window.next_tracks,
						prev_tracks: state.track_window.previous_tracks,
						shuffle_mode: state.shuffle,
						repeat_mode: state.repeat_mode
					}
				});

				// if current track, add class to body tag
				if (state.track_window.current_track) {
					document.body.classList.add('has-now-playing-bar');
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
