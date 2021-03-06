import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from 'contexts/AuthContext';
import { getUserInfo } from 'services/spotifyAPI'
import { setToken } from 'utils';
import LoadingView from 'components/views/LoadingView';
import ErrorView from 'components/views/ErrorView';

const Redirect = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(false);
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
				const [user, tracks, artists, playlists, discover_weekly, saved_albums, followed_artists] = data;

				// dispatch and store user data in AuthContext
				dispatch({ type: 'SET_USER', user });
				dispatch({ type: 'SET_TOP_TRACKS', tracks });
				dispatch({ type: 'SET_TOP_ARTISTS', artists });
				dispatch({ type: 'SET_PLAYLISTS', playlists });
				dispatch({ type: 'SET_DISCOVER_WEEKLY', discover_weekly });
				dispatch({ type: 'SET_SAVED_ALBUMS', saved_albums });
				dispatch({ type: 'SET_FOLLOWED_ARTISTS', followed_artists });

				// navigate user to dashboard
				navigate('/dashboard');
			}).catch(error => setError(error));
	}, [dispatch, navigate])

	if (error) {
		return <ErrorView />
	}

	return (
		<LoadingView />
	);
}

export default Redirect;
