import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from 'contexts/AuthContext';
import LoadingView from 'components/views/LoadingView';
import { getUserInfo } from 'services/spotifyAPI'
import { setToken } from 'utils';

const Redirect = () => {
	const navigate = useNavigate();
	const { dispatch } = useAuth();

	useEffect(() => {
		const parsedQueryString = queryString.parse(window.location.search);
		const { access_token, refresh_token, expires_at } = parsedQueryString;

		if (!access_token) {
			return navigate('/login');
		}

		// store tokens in local storage
		setToken(access_token, refresh_token, expires_at);

		// get user info
		getUserInfo()
			.then(data => {
				const [user, tracks, artists, playlists, discover_weekly] = data;
				// dispatch and store user data in AuthContext
				dispatch({ type: 'SET_USER', user });
				dispatch({ type: 'SET_TOP_TRACKS', tracks });
				dispatch({ type: 'SET_TOP_ARTISTS', artists });
				dispatch({ type: 'SET_PLAYLISTS', playlists });
				dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly })

				// navigate user to dashboard
				navigate('/dashboard');
			}).catch(error => {
				// handle error and navigate back to login
				console.error(error);
				navigate('/login');
			})
	}, [dispatch, navigate])

	return (
		<LoadingView />
	);
}

export default Redirect;
