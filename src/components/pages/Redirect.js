import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-js";
import { usePlayer } from '../../contexts/PlayerContext';
import { getToken } from '../../auth';

const spotify = new SpotifyWebApi();

const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = usePlayer();

	useEffect(() => {
		const token = getToken();
		// const token = "BQBUYAoCyQzqIlyeaFMUGjSFLGQCWv37vBbPZK8J01cHOYVhleZ-l7hSUfi0rA_7H231jot6L99Otw7M3GTwzGaX411huIlZa2WpL4KbW7X_o_Ldh3mjWuN39Ty_RNOLUnfrmkRW2WJ_0We7IhUBO74HA09J1W6Xbactx7s9EQ";

		if (!token) {
			// navigate to login page
			navigate('/');
		}

		if (token) {
			// set access token
			spotify.setAccessToken(token);

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
