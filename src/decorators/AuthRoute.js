import { useEffect } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthRoute = (props) => {
	const { user, dispatch, isValidSession } = useAuth();
	const location = useLocation();

	// check if session is valid
	useEffect(() => {
		if (!user) {
			return;
		} else if (!isValidSession()) {
			// clear state
			dispatch({ type: 'SET_USER', user: null });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname])

	return (
		user
			? (<Route {...props} />)
			: (<Navigate to='/' />)
	)

}

export default AuthRoute
