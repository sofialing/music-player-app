import { Route, Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const AuthRoute = (props) => {
	const { user } = useAuth();

	return (
		user
			? (<Route {...props} />)
			: (<Navigate to='/login' />)
	)

}

export default AuthRoute;
