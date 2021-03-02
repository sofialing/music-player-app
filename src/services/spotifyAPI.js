/**
 * Spotify API services
 */
import axios from 'axios';
import queryString from 'query-string';
import moment from 'moment';
import _ from 'lodash'


const BASEURL = 'https://api.spotify.com/v1/';

export const setToken = (access_token, expires_in, refresh_token) => {
	return localStorage.setItem('token', JSON.stringify({
		access_token,
		refresh_token,
		expires_in: (expires_in * 1000) + new Date().getTime()
	}))
}

export const getToken = () => {
	return JSON.parse(localStorage.getItem('token'));
}

const setAuthHeader = () => {
	try {
		const { access_token } = getToken();
		if (access_token) {
			// console.log('setting bearer token', access_token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
		}
	} catch (error) {
		console.log('Error setting auth', error);
	}
};

export const get = async (endpoint, queryParams = {}) => {
	setAuthHeader();
	const queryStr = queryString.stringify(queryParams);
	// console.log('GET:', endpoint, queryStr);
	// send request
	const response = await axios.get(`${BASEURL}${endpoint}?${queryStr}`);
	// return response data
	return response.data;
};

export const put = async (endpoint, body = {}) => {
	setAuthHeader();
	console.log('PUT:', endpoint, body);
	// send request
	const response = await axios.put(`${BASEURL}${endpoint}`, body);
	// return response status
	return response.status;
}

/**
 * Get the current user’s top tracks
 *
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Tracks object
 */
export const getTopTracks = async (options = {}) => {
	const response = await get('me/top/tracks', options);

	const topTracks = {
		...response,
		items: response.items.map(item => ({
			album: {
				id: item.album.id,
				name: item.album.name,
				image_url: _.isEmpty(item.album.images) ? null : item.album.images[0].url,
			},
			artists: item.artists.map(artist => artist.name).join(', '),
			duration: moment(item.duration_ms).format('mm:ss'),
			duration_ms: item.duration_ms,
			id: item.id,
			image_url: _.isEmpty(item.album.images) ? null : item.album.images[0].url,
			name: item.name,
			player_uri: item.uri,
			release_date: item.album.release_date,
			type: item.type,
		}))
	}

	return topTracks;
}

/**
 * Get the current user’s top artists
 *
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Artists object
 */
export const getTopArtists = async (options = {}) => {
	const response = await get('me/top/artists', options);

	const topArtists = {
		...response,
		items: response.items.map(item => ({
			followers: parseInt(item.followers.total).toLocaleString(),
			genres: item.genres,
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			player_uri: item.uri,
			type: item.type,
		}))
	};

	return topArtists;
}

/**
 * Get information about the current user
 *
 * @returns {Object} User object
 */
export const getCurrentUser = async () => {
	const response = await get('me');

	const user = {
		country: response.country,
		display_name: response.display_name,
		id: response.id,
		image: response.images[0].url,
		is_premium: response.product === 'premium',
	};

	return user;
}

/**
 * Get the current user's discover weekly
 *
 * @returns {Object} Playlist object
 */
export const getDiscoverWeekly = async () => {
	const response = await get('search', {
		q: 'discover weekly',
		type: 'playlist',
		market: 'from_token'
	});

	const result = response.playlists.items.find(item => item.owner.id === 'spotify');

	if (!result) {
		return null;
	}

	const discoverWeekly = {
		description: result.description,
		id: result.id,
		image_url: _.isEmpty(result.images) ? null : result.images[0].url,
		name: result.name,
		owner: result.owner.display_name,
		player_uri: result.uri,
		tracks: result.tracks,
		total_tracks: result.tracks.total,
		type: result.type,
	}

	return discoverWeekly;
}

/**
 * Get a list of the current user's playlists.
 *
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Playlist objects
 */
export const getUserPlaylists = async (options = {}) => {
	const response = await get('me/playlists', options);

	const playlists = {
		...response,
		items: response.items.map(item => ({
			description: item.description,
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			owner_name: item.owner.display_name,
			player_uri: item.uri,
			tracks: item.tracks,
			type: item.type,
		}))
	}

	return playlists;
}

/**
 * Get a specific playlist
 *
 * @param {String} playlistId The id of the playlist
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Playlist object
 */
export const getPlaylist = async (playlistId, options = {}) => {
	const response = await get('playlists/' + playlistId, options);

	const playlist = {
		description: response.description,
		followers: parseInt(response.followers.total).toLocaleString(),
		id: response.id,
		image_url: _.isEmpty(response.images) ? null : response.images[0].url,
		name: response.name,
		owner: response.owner.display_name,
		player_uri: response.uri,
		total_tracks: response.tracks.total,
		type: response.type,
	}

	return playlist;
}

/**
 * Get the tracks from a specific playlist
 *
 * @param {String} playlistId The id of the playlist
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Tracks object
 */
export const getPlaylistTracks = async (playlistId, options = {}) => {
	const response = await get('playlists/' + playlistId + '/tracks', options);

	const tracks = {
		...response,
		items: response.items.map(item => ({
			album: {
				id: item.track.album.id,
				name: item.track.album.name,
				image_url: _.isEmpty(item.track.album.images) ? null : item.track.album.images[0].url,
			},
			artists: item.track.artists.map((artist) => artist.name).join(', '),
			duration: moment(item.track.duration_ms).format('mm:ss'),
			duration_ms: item.track.duration_ms,
			id: item.track.id,
			image_url: _.isEmpty(item.track.album.images) ? null : item.track.album.images[0].url,
			name: item.track.name,
			player_uri: item.track.uri,
			release_date: item.track.album.release_date,
			type: item.track.type,
		}))
	};

	return tracks;
}

/**
 * Get an album from the Spotify catalog.
 *
 * @param {String} albumId The id of the album
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Album object
 */
export const getAlbum = async (albumId, options = {}) => {
	const response = await get('albums/' + albumId, {
		...options,
		market: 'from_token'
	});

	const album = {
		artists: response.artists.map(artist => artist.name).join(', '),
		genres: response.genres,
		id: response.id,
		image_url: _.isEmpty(response.images) ? null : response.images[0].url,
		name: response.name,
		player_uri: response.uri,
		release_date: response.release_date,
		total_length: moment(response.tracks.items.map(track => track.duration_ms).reduce((total, num) => total + num)).format('m'),
		total_tracks: response.tracks.total,
		tracks: response.tracks.items.map(item => ({
			artists: item.artists.map(artist => artist.name).join(', '),
			duration: moment(item.duration_ms).format('mm:ss'),
			duration_ms: item.duration_ms,
			id: item.id,
			name: item.name,
			player_uri: item.uri,
			type: item.type,
		})),
		type: response.album_type,
	}
	return album;
}

/**
 * Get an artist from the Spotify catalog
 *
 * @param {*} artistId The id of the artist
 * @returns {Object} Artist object
 */
export const getArtist = async (artistId) => {
	const response = await get('artists/' + artistId);

	const artist = {
		followers: parseInt(response.followers.total).toLocaleString(),
		genres: response.genres,
		id: response.id,
		image_url: _.isEmpty(response.images) ? null : response.images[0].url,
		name: response.name,
		player_uri: response.uri,
		type: response.type,
	}

	return artist;
}

/**
 * Get a list of top tracks of an artist from the Spotify catalog, for a specific country
 *
 * @param {*} artistId The id of the artist
 * @returns {Object} Track object
 */
export const getArtistTopTracks = async (artistId) => {
	const res = await get('artists/' + artistId + '/top-tracks', {
		market: 'from_token'
	});

	const topTracks = res.tracks.map(track => ({
		album: {
			name: track.album.name,
			id: track.album.id,
			image_url: _.isEmpty(track.album.images) ? null : track.album.images[0].url,
		},
		artists: track.artists.map((artist) => artist.name).join(', '),
		duration: moment(track.duration_ms).format('mm:ss'),
		duration_ms: track.duration_ms,
		id: track.id,
		image_url: _.isEmpty(track.album.images) ? null : track.album.images[0].url,
		name: track.name,
		player_uri: track.uri
	}))

	return topTracks;
}

/**
 * Get Spotify catalog information about artists similar to a given artist
 *
 * @param {*} artistId The id of the artist
 * @returns {Object} Artists object
 */
export const getArtistRelatedArtists = async (artistId) => {
	const response = await get('artists/' + artistId + '/related-artists');

	const artists = response.artists.map(item => ({
		followers: parseInt(item.followers.total).toLocaleString(),
		genres: item.genres,
		id: item.id,
		image_url: _.isEmpty(item.images) ? null : item.images[0].url,
		name: item.name,
		player_uri: item.uri,
		type: item.type,
	}))

	return artists;
}

/**
 * Get Spotify catalog information about an artist’s albums
 *
 * @param {*} artistId The id of the artist
 * @returns {Object} Albums object
 */
export const getArtistAlbums = async (artistId, options = {}) => {
	const response = await get('artists/' + artistId + '/albums', {
		...options,
		market: 'from_token'
	});

	const albums = {
		...response,
		items: response.items.map(item => ({
			artists: item.artists.map(artist => artist.name).join(', '),
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			player_uri: item.uri,
			release_date: item.release_date.split('-')[0],
			total_tracks: item.total_tracks,
			type: item.album_type
		}))
	}

	return albums;
}

/**
 * Get a list of Spotify featured playlists
 *
 * @returns {Object} Playlists object
 */
export const getFeaturedPlaylists = async (options = {}) => {
	const response = await get('browse/featured-playlists', {
		...options,
		country: 'from_token',
		timestamp: new Date().toISOString()
	});

	const playlists = {
		...response,
		playlists: {
			...response.playlists,
			items: response.playlists.items.map(item => ({
				description: item.description,
				id: item.id,
				image_url: _.isEmpty(item.images) ? null : item.images[0].url,
				name: item.name,
				owner: item.owner.display_name,
				player_uri: item.uri,
				tracks: item.tracks,
				total_tracks: item.tracks.total,
				type: item.type,
			}))
		}
	}

	return playlists;
}

/**
 * Get a list of new album releases featured in Spotify
 *
 * @returns {Object} Albums object
 */
export const getNewReleases = async (options = {}) => {
	const response = await get('browse/new-releases', {
		...options,
		country: 'from_token',
		timestamp: new Date().toISOString(),
	});

	const releases = {
		...response.albums,
		items: response.albums.items.map(item => ({
			artists: item.artists.map((artist) => artist.name).join(', '),
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			player_uri: item.uri,
			release_date: item.release_date.split('-')[0],
			type: item.album_type,
		}))
	};

	return releases;
}

/**
 * Get a list of categories used to tag items in Spotify
 *
 * @returns {Object} Categories object
 */
export const getCategories = async (options = {}) => {
	const response = await get('browse/categories', {
		...options,
		country: 'from_token'
	});

	const categories = {
		...response.categories,
		items: response.categories.items.map(item => ({
			id: item.id,
			image_url: item.icons[0].url,
			name: item.name,
		}))
	};

	return categories;
}

/**
 * Create a recommendations based on seed artists and tracks
 *
 * @param {Array} artists List of artists for seed
 * @param {Array} tracks List of tracks for seed
 * @returns {Object} Tracks object
 */
export const getRecommendations = async (artists, tracks) => {
	// get IDs for seed artists and tracks.
	const seed_artists = artists.slice(0, 3).map(item => item.id).join(',');
	const seed_tracks = tracks.slice(0, 2).map(item => item.id).join(',');

	const response = await get('recommendations', {
		market: 'from_token', seed_artists, seed_tracks
	});

	const recommendations = response.tracks.map(track => ({
		album: {
			name: track.album.name,
			id: track.album.id,
			image_url: _.isEmpty(track.album.images) ? null : track.album.images[0].url,
		},
		artists: track.artists.map((artist) => artist.name).join(', '),
		duration_ms: track.duration_ms,
		id: track.id,
		image_url: _.isEmpty(track.album.images) ? null : track.album.images[0].url,
		name: track.name,
		player_uri: track.uri,
		type: track.type,
	}));

	return recommendations;
}

/**
 * Get a single category used to tag items in Spotify
 *
 * @param {String} categoryId The id of the category
 * @returns {Object} Category object
 */
export const getCategory = async (categoryId) => {
	const response = await get('browse/categories/' + categoryId, {
		country: 'from_token'
	});
	return response;
}

/**
 * Get a list of Spotify playlists tagged with a particular category
 *
 * @param {String} categoryId The id of the category
 * @returns {Object} Playlists object
 */
export const getCategoryPlaylists = async (categoryId, options = {}) => {
	const response = await get('browse/categories/' + categoryId + '/playlists', {
		country: 'from_token',
		...options
	});

	const playlists = {
		...response.playlists,
		items: response.playlists.items.map(item => ({
			description: item.description,
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			owner: item.owner.display_name,
			player_uri: item.uri,
			tracks: item.tracks,
			type: item.type,
		}))
	};

	return playlists;
}

/**
 * Get a list of the albums saved in the current Spotify user's library
 *
 * @returns {Object} Albums object
 */
export const getUsersSavedAlbums = async (options = {}) => {
	const response = await get('me/albums', {
		market: 'from_token',
		...options
	});

	const albums = {
		...response,
		items: response.items.map(item => ({
			artists: item.album.artists.map((artist) => artist.name).join(', '),
			genres: item.album.genres,
			id: item.album.id,
			image_url: _.isEmpty(item.album.images) ? null : item.album.images[0].url,
			name: item.album.name,
			player_uri: item.album.uri,
			release_date: item.album.release_date.split('-')[0],
			total_tracks: item.album.tracks.total,
			total_length: moment(item.album.tracks.items.map(track => track.duration_ms).reduce((total, num) => total + num)).format('m'),
			tracks: item.album.tracks,
			type: item.album.album_type,
		}))
	};

	return albums;
}

/**
 * Get the current user's followed artist
 *
 * @returns {Object} Artists object
 */
export const getFollowedArtists = async () => {
	const response = await get('me/following', {
		type: 'artist'
	});

	const artists = {
		...response.artists,
		items: response.artists.items.map(item => ({
			followers: parseInt(item.followers.total).toLocaleString(),
			genres: item.genres,
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			player_uri: item.uri,
			type: item.type,
		})),
	}

	return artists;
}

/**
 * Fetches current user's saved tracks
 *
 */
export const getMySavedTracks = async (options = {}) => {
	const response = await get('me/tracks', {
		market: 'from_token',
		...options,
	});

	const tracks = {
		...response,
		items: response.items.map(item => ({
			album: {
				name: item.track.album.name,
				id: item.track.album.id,
				image_url: _.isEmpty(item.track.album.images) ? null : item.track.album.images[0].url,
			},
			artists: item.track.artists.map(artist => artist.name).join(', '),
			duration: moment(item.track.duration_ms).format('mm:ss'),
			duration_ms: item.track.duration_ms,
			id: item.track.id,
			image_url: _.isEmpty(item.track.album.images) ? null : item.track.album.images[0].url,
			name: item.track.name,
			player_uri: item.track.uri
		}))
	}

	return tracks;
}

/**
 * Get Spotify catalog information about artists, albums, tracks or playlists that match a keyword string
 *
 * @param {String} query The search query
 * @param {Array} types An array of item types to search across. Valid types are: 'album', 'artist', 'playlist', and 'track'.
 * @param {Object} options A JSON object with options that can be passed
 */
export const search = async (query, types, options = {}) => {
	const response = await get('search', {
		q: query,
		type: types.join(','),
		market: 'from_token',
		...options,
	});

	console.log('search response', response);

	return response;

}

/**
 * Get Spotify catalog information about artists, albums, tracks or playlists that match a keyword string
 *
 * @param {String} query The search query
 * @param {Object} options A JSON object with options that can be passed
 */
export const searchAll = async (query, options = {}) => {
	const response = await get('search', {
		q: query,
		type: 'album,artist,track',
		market: 'from_token',
		...options,
	});

	const results = [
		{
			...response.albums,
			type: 'albums',
			items: response.albums.items.map(item => ({
				artists: item.artists.map(artist => artist.name).join(', '),
				id: item.id,
				image_url: _.isEmpty(item.images) ? null : item.images[0].url,
				name: item.name,
				player_uri: item.uri,
				release_date: item.release_date.split('-')[0],
				total_tracks: item.total_tracks,
				type: item.album_type,
			}))
		},
		{
			...response.artists,
			type: 'artists',
			items: response.artists.items.map(item => ({
				followers: parseInt(item.followers.total).toLocaleString(),
				genres: item.genres,
				id: item.id,
				image_url: _.isEmpty(item.images) ? null : item.images[0].url,
				name: item.name,
				player_uri: item.uri,
				type: item.type,
			}))
		},
		{
			...response.tracks,
			type: 'tracks',
			items: response.tracks.items.map(item => ({
				album: {
					id: item.album.id,
					name: item.album.name,
					image_url: _.isEmpty(item.album.images) ? null : item.album.images[0].url,
				},
				artists: item.artists.map(artist => artist.name).join(', '),
				duration: moment(item.duration_ms).format('mm:ss'),
				duration_ms: item.duration_ms,
				id: item.id,
				image_url: _.isEmpty(item.album.images) ? null : item.album.images[0].url,
				name: item.name,
				player_uri: item.uri,
				release_date: item.album.release_date,
				type: item.type,
			}))
		}
	]

	return results;
}

export const searchAlbums = async (query, options = {}) => {
	const response = await get('search', {
		q: query,
		type: 'album',
		market: 'from_token',
		...options,
	});

	const albums = {
		...response.albums,
		items: response.albums.items.map(item => ({
			artists: item.artists.map(artist => artist.name).join(', '),
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			player_uri: item.uri,
			release_date: item.release_date.split('-')[0],
			total_tracks: item.total_tracks,
			type: item.album_type,
		}))
	}

	return albums;
}

export const searchArtists = async (query, options = {}) => {
	const response = await get('search', {
		q: query,
		type: 'artist',
		market: 'from_token',
		...options,
	});

	const artists = {
		...response.artists,
		items: response.artists.items.map(item => ({
			followers: parseInt(item.followers.total).toLocaleString(),
			genres: item.genres,
			id: item.id,
			image_url: _.isEmpty(item.images) ? null : item.images[0].url,
			name: item.name,
			player_uri: item.uri,
			type: item.type,
		}))
	};

	return artists;
}

export const searchTracks = async (query, options = {}) => {
	const response = await get('search', {
		q: query,
		type: 'track',
		market: 'from_token',
		...options,
	});

	const tracks = {
		...response.tracks,
		items: response.tracks.items.map(item => ({
			album: {
				id: item.album.id,
				name: item.album.name,
				image_url: _.isEmpty(item.album.images) ? null : item.album.images[0].url,
			},
			artists: item.artists.map(artist => artist.name).join(', '),
			duration: moment(item.duration_ms).format('mm:ss'),
			duration_ms: item.duration_ms,
			id: item.id,
			image_url: _.isEmpty(item.album.images) ? null : item.album.images[0].url,
			name: item.name,
			player_uri: item.uri,
			release_date: item.album.release_date,
			type: item.type,
		}))
	};

	return tracks;
}

/**
 * Play a track on the user's active device
 *
 * @param {Object} options A JSON object with options that can be passed.
 */
export const play = async (device_id, options = {}) => {
	const response = await put(`me/player/play?device_id=${device_id}`, options);
	return response;
}

/**
 * Pause playback on the user’s account.
 *
 * @param {Object} options A JSON object with options that can be passed.
 */
export const pause = async (device_id, options = {}) => {
	const response = await put('/me/player/pause', device_id, options);
	return response;
}
