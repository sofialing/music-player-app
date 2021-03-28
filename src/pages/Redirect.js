import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from 'contexts/AuthContext';
import LoadingView from 'components/layout/views/LoadingView';
import { setToken, getTopTracks, getTopArtists, getCurrentUser, getDiscoverWeekly, getUserPlaylists } from 'services/spotifyAPI'

const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = useAuth();

	useEffect(() => {
		const parsedQueryString = queryString.parse(window.location.search);
		const { access_token, refresh_token, expires_in } = parsedQueryString;

		if (!access_token) {
			return navigate('/login');
		}

		// store tokens in local storage
		setToken(access_token, expires_in, refresh_token)
		dispatch({ type: 'SET_ACCESS_TOKEN', access_token })

		const FETCH_DATA = [
			getCurrentUser(),
			getTopTracks(),
			getTopArtists({ limit: 18 }),
			getUserPlaylists(),
			getDiscoverWeekly(),
		]

		Promise.all(FETCH_DATA)
			.then(data => {
				const [user, tracks, artists, playlists, discover_weekly] = data;
				// store user data in auth context
				dispatch({ type: 'SET_USER', user });
				dispatch({ type: 'SET_TOP_TRACKS', tracks });
				dispatch({ type: 'SET_TOP_ARTISTS', artists });
				dispatch({ type: 'SET_PLAYLISTS', playlists });
				dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly })

				// navigate user to dashboard
				navigate('/dashboard');
			})
			.catch(error => {
				// handle error
				console.log(error)
			})
	}, [dispatch, navigate])

	return (
		<LoadingView />
	);
}

export default Redirect;
