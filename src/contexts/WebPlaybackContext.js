import { createContext, useContext, useState, useEffect } from 'react'
import { usePlayer } from './PlayerContext';

const WebPlaybackContext = createContext();

const useWebPlayback = () => {
	return useContext(WebPlaybackContext);
}

const WebPlaybackContextProvider = ({ children }) => {
	const { token } = usePlayer();
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [player, setPlayer] = useState(null);
	const [deviceId, setDeviceId] = useState(null);

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
			if (!token) {
				return;
			};

			const player = new window.Spotify.Player({
				name: 'React Music Player',
				getOAuthToken: cb => { cb(token); }
			});

			// Error handling
			player.addListener('initialization_error', ({ message }) => { console.error(message); });
			player.addListener('authentication_error', ({ message }) => { console.error(message); });
			player.addListener('account_error', ({ message }) => { console.error(message); });
			player.addListener('playback_error', ({ message }) => { console.error(message); });

			// Playback status updates
			player.addListener('player_state_changed', state => { console.log(state); });

			// Ready
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				setDeviceId(device_id);
			});

			// Not Ready
			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
				setDeviceId(null);
			});

			// Connect to the player!
			player.connect().then(success => {
				if (success) {
					console.log('The Web Playback SDK successfully connected to Spotify!');
					setPlayer(player);
				}
			});
		};

	}, [token, scriptLoaded])

	return (
		<WebPlaybackContext.Provider value={{ deviceId, player }}>
			{children}
		</WebPlaybackContext.Provider>
	)
}

export { useWebPlayback, WebPlaybackContext, WebPlaybackContextProvider as default }
