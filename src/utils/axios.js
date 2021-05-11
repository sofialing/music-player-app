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
			// try to get refresh token from localStorage
			const { refresh_token } = getToken();

			if (refresh_token) {
				return axios.get(process.env.REACT_APP_BACKEND_URI + 'refresh_token', {
					params: { refresh_token }
				}).then(res => {
					if (res.status === 200) {
						const { access_token, expires_at } = res.data;
						// store new access token in local storage
						setToken(access_token, refresh_token, expires_at);

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

/**
 * HTTP GET request
 *
 * @param {String} endpoint API endpoint that will be used for the request
 * @param {Object} params URL parameters to be sent with the request
 */
export const get = async (endpoint, params = {}) => {
	const response = await axiosInstance.get(endpoint, { params });
	// return response data
	return response.data;
};

/**
 * HTTP PUT request
 *
 * @param {String} endpoint API endpoint that will be used for the request
 * @param {Object} body the data to be sent as the request body
 */
export const put = async (endpoint, body = {}) => {
	const response = await axiosInstance.put(endpoint, body);
	// return response status
	return response.status;
}

export default axiosInstance;
