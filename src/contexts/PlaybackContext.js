import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { reducer, initialState } from '../reducers/playbackReducer';
import { useAuth } from './AuthContext';
import { getToken, hasValidAccessToken } from 'utils';
import axios from 'utils/axios';

const PlaybackContext = createContext();

const usePlayback = () => {
	return useContext(PlaybackContext);
}

const PlaybackContextProvider = ({ children }) => {
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const { user } = useAuth();

	const loadSpotifyScript = () => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		document.body.appendChild(script);
		setScriptLoaded(true);
	}

	useEffect(() => {
		if (user && !scriptLoaded) {
			loadSpotifyScript();
		}

		window.onSpotifyWebPlaybackSDKReady = () => {
			// initialize new player instance
			const player = new window.Spotify.Player({
				name: 'Re:music',
				getOAuthToken: callback => {
					if (!hasValidAccessToken()) {
						console.log('token now valid, trigger refresh token!');
						return axios.get('me').then(res => {
							if (res.status === 200) {
								const { access_token } = getToken();
								callback(access_token);
							}
						});
					}
					const { access_token } = getToken();
					callback(access_token);
				}
			});

			// Error handling
			player.addListener('initialization_error', ({ message }) => {
				console.error('Failed to initialize', message);
			});
			player.addListener('authentication_error', ({ message }) => {
				console.error('Failed to authenticate', message);
			});
			player.addListener('account_error', ({ message }) => {
				console.error('Failed to validate Spotify account', message);
			});
			player.addListener('playback_error', ({ message }) => {
				console.error('Failed to perform playback', message);
			});

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

			// Player ready and device connected
			player.addListener('ready', ({ device_id }) => {
				console.log('Connected with Device ID', device_id);
				dispatch({ type: 'SET_DEVICE_ID', device_id })
			});

			// Connect the Web Playback SDK instance to Spotify
			player.connect().then(success => {
				if (success) {
					console.log('The Web Playback SDK successfully connected to Spotify!');
					dispatch({ type: 'SET_PLAYER', player })
				}
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	useEffect(() => {

	}, [])

	return (
		<PlaybackContext.Provider value={{ ...state, dispatch }}>
			{children}
		</PlaybackContext.Provider>
	)
}

export { usePlayback, PlaybackContext, PlaybackContextProvider as default }
