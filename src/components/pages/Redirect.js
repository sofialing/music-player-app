import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import SpotifyWebApi from "spotify-web-api-js";
import { useAuth } from '../../contexts/AuthContext';
import { setAccessToken } from '../../services/spotifyAPI'
const spotify = new SpotifyWebApi();

const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = useAuth();

	useEffect(() => {
		const parsedQueryString = queryString.parse(window.location.search);
		const { access_token, refresh_token, expires_in } = parsedQueryString;
		// const refresh_token = parsedQueryString.refresh_token;
		// const expires_in = parsedQueryString.expires_in;

		if (!access_token) {
			// navigate to login page
			return navigate('/');
		}

		// set access token
		spotify.setAccessToken(access_token);

		// store access and refresh token
		// const token = {
		// 	access_token,
		// 	expiresAt: (expires_in * 1000) + new Date().getTime(),
		// 	refresh_token
		// }

		setAccessToken(access_token, expires_in, refresh_token)

		// localStorage.setItem('token', JSON.stringify(token));
		dispatch({ type: 'SET_ACCESS_TOKEN', access_token });
		dispatch({ type: 'SET_REFRESH_TOKEN', refresh_token });

		// store spotify API wrapper
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
	}, [dispatch, navigate])

	return (
		<p>Loading...</p>
	);
}

export default Redirect;
