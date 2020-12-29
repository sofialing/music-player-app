const initialState = {
	player: null,
	device_id: null,
	current_track: null,
	is_playing: false,
}

const reducer = (state, action) => {
	console.log('playback', 'action', action);
	switch (action.type) {
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
		case 'SET_CURRENT_TRACK':
			return {
				...state,
				current_track: action.current_track
			};
		case 'SET_IS_PLAYING':
			return {
				...state,
				is_playing: action.is_playing
			};
		default:
			return state;
	}
}

export { initialState, reducer }
