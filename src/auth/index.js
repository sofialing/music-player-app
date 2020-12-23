const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
	'playlist-read-private',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-top-read',
	'user-modify-playback-state',
];

const accessUrl = `${authEndpoint}
		?client_id=${clientId}
		&redirect_uri=${redirectUri}
		&scope=${scopes.join("%20")}
		&response_type=token
		&show_dialog=true`;

const getToken = () => {
	return new URLSearchParams(window.location.hash.replace('#', '?')).get('access_token')
};

export { authEndpoint, accessUrl, getToken }
