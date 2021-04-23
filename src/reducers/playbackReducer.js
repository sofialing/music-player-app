const initialState = {
	device_id: null,
	display_player: false,
	player: null,
	playback_state: {
		context: null,
		current_position: null,
		is_playing: false,
		current_track: null,
		next_tracks: [],
		prev_tracks: [],
		shuffle_mode: false,
		repeat_mode: false
	}
}

const reducer = (state, action) => {
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
		case 'SET_DISPLAY_PLAYER':
			return {
				...state,
				display_player: action.display_player
			};
		case 'SET_PLAYBACK_STATE':
			return {
				...state,
				playback_state: action.playback_state
			};
		default:
			return state;
	}
}

export { initialState, reducer }
