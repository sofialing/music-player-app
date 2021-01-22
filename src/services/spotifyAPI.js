/**
 * Spotify API services
 */
import axios from 'axios';
import queryString from 'query-string';

const API_BASEURL = 'https://api.spotify.com/v1/';

export const getAccessToken = () => {
	const expires = localStorage.getItem('expires_in');
	if ((new Date()).getTime() > expires) {
		return '';
	}
	const access_token = localStorage.getItem('access_token');
	return access_token;
}

export const setAccessToken = (access_token, expires_in, refresh_token) => {
	localStorage.setItem('access_token', access_token);
	localStorage.setItem('refresh_token', refresh_token);
	localStorage.setItem('expires_in', (expires_in * 1000) + new Date().getTime());
}

const get = async (endpoint, queryParams = {}) => {

}
