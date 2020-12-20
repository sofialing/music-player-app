import { createContext, useContext, useReducer } from 'react';
import { musicPlayerReducer, initialState } from '../reducers/musicPlayerReducer';

const PlayerContext = createContext();
const usePlayer = () => {
	return useContext(PlayerContext);
}

const PlayerContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(musicPlayerReducer, initialState);

	return (
		<PlayerContext.Provider value={{ ...state, dispatch }}>
			{children}
		</PlayerContext.Provider>
	)
}

export { usePlayer, PlayerContext, PlayerContextProvider as default }
