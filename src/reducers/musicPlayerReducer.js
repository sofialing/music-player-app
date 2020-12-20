export const initialState = {
	isPlaying: false,
	playlists: null,
	spotify: null,
	token: null,
	user: null,
}

export const musicPlayerReducer = (state, action) => {
	console.log('action', action);
	switch (action.type) {
		case 'SET_TOKEN':
			return {
				...state,
				token: action.token
			};
		case 'SET_USER':
			return {
				...state,
				user: action.user
			};
		case 'SET_SPOTIFY':
			return {
				...state,
				spotify: action.spotify
			};
		case 'SET_PLAYLISTS':
			return {
				...state,
				playlists: action.playlists
			};
		default:
			return state;
	}
}
