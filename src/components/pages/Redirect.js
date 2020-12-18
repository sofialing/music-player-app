import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-js";
import { usePlayer } from '../../contexts/PlayerContext';
import { getTokenFromResponse } from '../../spotify/auth';

const spotify = new SpotifyWebApi();

const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = usePlayer();
	useEffect(() => {
		const hash = getTokenFromResponse();
		window.location.hash = "";
		let token = hash.access_token;

		if (token) {
			// set access token
			spotify.setAccessToken(token);

			// store token
			dispatch({ type: 'SET_TOKEN', token });

			// store spotify wrapper
			dispatch({ type: 'SET_SPOTIFY', spotify })

			// get and store user profile
			spotify.getMe().then(user => {
				dispatch({ type: 'SET_USER', user });

				// navigate to dashboard
				navigate('/dashboard');
			});

			// get and store users playlists
			spotify.getUserPlaylists({ limit: 50 }).then(playlists => {
				dispatch({ type: 'SET_PLAYLISTS', playlists });

				// navigate to dashboard
				navigate('/dashboard');
			});


		}
	}, [dispatch, navigate])
	return '';
}

export default Redirect;
