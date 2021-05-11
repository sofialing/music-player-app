/**
 * Helper Functions
 */
import moment from 'moment';
import { isEmpty } from 'lodash'

export const formatNumber = number => {
	return parseInt(number).toLocaleString();
}

export const formatTime = time_ms => {
	return moment(time_ms).format('mm:ss');
}

export const formatDuration = time_ms => {
	return moment(time_ms).format('mm:ss');
}

export const getMinutes = time_ms => {
	return moment(time_ms).format('m');
}

export const joinArtists = artist_array => {
	return artist_array.map((artist) => artist.name).join(', ');
}

export const getYear = date => {
	return date.split('-')[0];
}

export const getImageUrl = image_array => {
	return isEmpty(image_array) ? null : image_array[0].url
}

export const getAlbumLength = tracks => {
	const total_ms = tracks
		.map(track => track.duration_ms)
		.reduce((total, num) => total + num);

	return getMinutes(total_ms);
}

export const getTracks = total => {
	return total > 2 ? `${total} tracks` : `${total} track`
}

/**
 * Store tokens in local storage
 *
 * @param {String} access_token An access token that can be provided in subsequent calls to Spotify Web API services.
 * @param {String} refresh_token A token that can be sent to retrieve new access token
 */
export const setToken = (access_token, refresh_token, expires_at) => {
	return localStorage.setItem('token', JSON.stringify({ access_token, refresh_token, expires_at }))
}

/**
 * Get token from local storage
 *
 * @returns {Object} Access token, refresh token and expires at
 */
export const getToken = () => {
	return JSON.parse(localStorage.getItem('token'));
}

/**
 * Remove token from local storage
 */
export const removeToken = () => {
	return localStorage.removeItem('token');
}

/**
 * Check for valid access token in local storage
 *
 * @returns {Bolean} true or false
 */
export const hasValidAccessToken = () => {
	if (!getToken()) {
		return false;
	}
	const { expires_at, access_token } = getToken();
	const current_time = new Date().getTime();

	return access_token && expires_at > current_time;
}
