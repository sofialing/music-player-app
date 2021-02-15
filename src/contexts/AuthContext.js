import { createContext, useContext, useReducer } from 'react';
import { reducer, initialState } from '../reducers/authReducer';

const AuthContext = createContext();

const useAuth = () => {
	return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const isValidSession = () => {
		const current_time = new Date().getTime();
		const { expires_in } = JSON.parse(localStorage.getItem('token'));

		return current_time < expires_in;
	}

	return (
		<AuthContext.Provider value={{ ...state, dispatch, isValidSession }}>
			{children}
		</AuthContext.Provider>
	)
}

export { useAuth, AuthContext, AuthContextProvider as default }
