const initialState = {
	discover_weekly: null,
	user_playlists: null,
	top_artists: null,
	top_tracks: null,
	user: null,
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.user
			};
		case 'SET_PLAYLISTS':
			return {
				...state,
				user_playlists: action.playlists
			};
		case 'SET_TOP_ARTISTS':
			return {
				...state,
				top_artists: action.artists
			};
		case 'SET_TOP_TRACKS':
			return {
				...state,
				top_tracks: action.tracks
			};
		case 'SET_DISCOVER_WEEKLY':
			return {
				...state,
				discover_weekly: action.discover_weekly
			};
		case 'RESET_STATE':
			return initialState;
		default:
			return state;
	}
}

export { initialState, reducer }
