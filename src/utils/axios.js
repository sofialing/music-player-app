import axios from 'axios';
import { getToken, setToken } from 'utils';

const axiosInstance = axios.create({
	baseURL: 'https://api.spotify.com/v1/',
});

axiosInstance.interceptors.request.use(config => {
	const { access_token } = getToken();
	if (access_token) {
		config.headers.Authorization = `Bearer ${access_token}`
	};

	return config;
});

axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		const originalRequest = error.config;
		if (error.response.status === 401) {
			console.error('401 – Unauthorized');

			// get refresh token from localStorage
			const { refresh_token } = getToken('refresh_token');

			if (refresh_token) {
				return axios.get(process.env.REACT_APP_BACKEND_URI + 'refresh_token', {
					params: { refresh_token }
				}).then(res => {
					if (res.status === 200) {
						const { access_token, expires_in } = res.data;
						// store tokens in local storage and authContext
						setToken(access_token, expires_in, refresh_token);

						// trigger authContext update here

						// update the headers for the instance with the new access token in the Authorization header
						axiosInstance.defaults.headers['Authorization'] = `Bearer ${access_token}`;

						// update the headers for the original request with the new access token in the Authorization header
						originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

						// return the originalRequest object with Axios.
						return axios(originalRequest);
					}
				});
			} else {
				// no refresh token, redirect to login page
			}
		}
		return error;
	}
);

export default axiosInstance;
