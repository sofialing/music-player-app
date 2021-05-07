import { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { getToken } from 'utils';

const AuthRoute = (props) => {
	const { access_token, user } = useAuth();

	useEffect(() => {
		if (!user) {
			return;
		}
		const storedToken = getToken();
		if (storedToken.access_token !== access_token) {
			console.log('update access_token');
			// dispatch({ type: 'SET_ACCESS_TOKEN', access_token: storedToken.access_token })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, access_token])

	return (
		user
			? (<Route {...props} />)
			: (<Navigate to='/login' />)
	)

}

export default AuthRoute;
