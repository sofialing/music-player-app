export const initialState = {
	isPlaying: false,
	playlists: null,
	spotify: null,
	token: null,
	user: null,
	top_artists: null,
	top_tracks: null,
	discover_weekly: null,
	current_track: null,
	audio: null,
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
		case 'SET_PLAYER':
			return {
				...state,
				player: action.player
			};
		case 'SET_DEVICE_ID':
			return {
				...state,
				device_id: action.device_id
			};
		case 'SET_PLAYLISTS':
			return {
				...state,
				playlists: action.playlists
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
		case 'SET_CURRENT_TRACK':
			return {
				...state,
				current_track: action.track
			};
		case 'SET_AUDIO':
			return {
				...state,
				audio: action.audio
			};
		case 'SET_PLAYING':
			return {
				...state,
				isPlaying: action.playing
			};
		default:
			return state;
	}
}
