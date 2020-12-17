import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-js";
import { usePlayer } from '../../contexts/PlayerContext';
import { getTokenFromResponse } from '../../spotify/auth';
const spotifyApi = new SpotifyWebApi();


const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = usePlayer();
	useEffect(() => {
		const hash = getTokenFromResponse();
		window.location.hash = "";
		let token = hash.access_token;

		if (token) {
			spotifyApi.setAccessToken(token);
			dispatch({ type: 'ADD_TOKEN', token });
			spotifyApi.getMe().then((user) => {
				dispatch({ type: 'ADD_USER', user });
			});

			navigate('/dashboard');

		}
	}, [dispatch, navigate])
	return <div>Redirect Page</div>;
}

export default Redirect;
