const initialState = {
	discover_weekly: null,
	user_playlists: null,
	spotify: null,
	token: null,
	top_artists: null,
	top_tracks: null,
	user: null,
}

const reducer = (state, action) => {
	console.log('auth', 'action', action);
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
				discover_weekly: action.playlist
			};
		default:
			return state;
	}
}

export { initialState, reducer }
