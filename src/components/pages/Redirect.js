import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-js";
import { usePlayer } from '../../contexts/PlayerContext';
import { getToken } from '../../auth';

const spotify = new SpotifyWebApi();

const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = usePlayer();

	const initSpotifySDK = () => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		document.body.appendChild(script);
	}

	useEffect(() => {
		const token = getToken();

		if (!token) {
			// navigate to login page
			navigate('/');
		}

		if (token) {
			// set access token
			spotify.setAccessToken(token);

			// init Spotify SDK and store player instance
			initSpotifySDK();
			window.onSpotifyWebPlaybackSDKReady = () => {
				const player = new window.Spotify.Player({
					name: 'Music Player',
					getOAuthToken: cb => { cb(token); }
				});
				player.addListener('ready', ({ device_id }) => {
					console.log('Connected with Device ID', device_id);
					dispatch({ type: 'SET_DEVICE_ID', device_id })
				});
				player.connect().then(success => {
					if (success) {
						console.log('The Web Playback SDK successfully connected to Spotify!');
						dispatch({ type: 'SET_PLAYER', player })
					}
				});
			}

			// store token
			dispatch({ type: 'SET_TOKEN', token });

			// store spotify wrapper
			dispatch({ type: 'SET_SPOTIFY', spotify })

			// get and store users top artists
			spotify.getMyTopArtists({ limit: 10 }).then(artists => {
				dispatch({ type: 'SET_TOP_ARTISTS', artists })
			});

			// get and store users top artists
			spotify.getMyTopTracks({ limit: 10 }).then(tracks => {
				dispatch({ type: 'SET_TOP_TRACKS', tracks })
			});

			spotify.searchPlaylists('discover weekly').then(({ playlists }) => {
				const playlist = playlists.items.find(playlist => playlist.owner.id === 'spotify')
				if (playlist) {
					dispatch({ type: 'SET_DISCOVER_WEEKLY', playlist })
				}
			});

			// get and store users playlists
			spotify.getUserPlaylists({ limit: 20 }).then(playlists => {
				dispatch({ type: 'SET_PLAYLISTS', playlists });
			});

			// get and store user profile
			spotify.getMe().then(user => {
				dispatch({ type: 'SET_USER', user });

				// navigate to users dashboard
				navigate(`/dashboard/${user.id}`);
			});
		}
	}, [dispatch, navigate])
	return '';
}

export default Redirect;
