import { createContext, useContext, useReducer } from 'react';
import { playerReducer, initialState } from '../reducers/playerReducer';

const PlayerContext = createContext();
const usePlayer = () => {
	return useContext(PlayerContext);
}

const PlayerContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(playerReducer, initialState);

	return (
		<PlayerContext.Provider value={{ state, dispatch }}>
			{children}
		</PlayerContext.Provider>
	)
}

export { usePlayer, PlayerContext, PlayerContextProvider as default }
