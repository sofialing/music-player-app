export const initialState = {
	user: null,
	token: null,
}

export const playerReducer = (state, action) => {
	console.log('action', action);
	switch (action.type) {
		case 'ADD_TOKEN':
			return {
				...state,
				token: action.token
			};
		case 'ADD_USER':
			return {
				...state,
				user: action.user
			};
		default:
			return state;
	}
}
