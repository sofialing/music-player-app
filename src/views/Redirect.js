import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-js";
import { useAuth } from '../contexts/AuthContext';
import { getToken } from '../spotify/login';

const spotify = new SpotifyWebApi();

const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = useAuth();

	useEffect(() => {
		const token = getToken();
		window.location.hash = '';

		if (!token) {
			// navigate to login page
			return navigate('/');
		}

		// set access token and store in localStorage
		spotify.setAccessToken(token);

		// store token
		dispatch({ type: 'SET_TOKEN', token });

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
	return '';
}

export default Redirect;
