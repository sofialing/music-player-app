const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

export const loginWithSpotify = () => {
	const scopes = [
		'playlist-read-private',
		'user-read-private',
		'user-read-currently-playing',
		'user-read-recently-played',
		'user-read-playback-state',
		'user-top-read',
		'user-modify-playback-state',
		'user-read-email',
		'streaming'
	];

	window.location = [
		'https://accounts.spotify.com/authorize',
		`?client_id=${clientId}`,
		`&redirect_uri=${redirectUri}`,
		`&scope=${scopes.join('%20')}`,
		`&response_type=token`,
		`&show_dialog=true`,
	].join('');
}

export const getToken = () => {
	return new URLSearchParams(window.location.hash.replace('#', '?')).get('access_token');
};
