import { Route, Navigate } from 'react-router-dom'
import { usePlayer } from '../contexts/PlayerContext';

const AuthRoute = (props) => {
	const { user } = usePlayer();
	return (
		user
			? (<Route {...props} />)
			: (<Navigate to='/' />)
	)

}

export default AuthRoute
