/**
 * Spotify API services
 */
import { get, put } from 'utils/axios';
import { joinArtists, formatDuration, formatNumber, getYear, getAlbumLength, getImageUrl } from 'utils';

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
				image_url: getImageUrl(item.album.images),
			},
			artists: joinArtists(item.artists),
			duration: formatDuration(item.duration_ms),
			duration_ms: item.duration_ms,
			id: item.id,
			image_url: getImageUrl(item.album.images),
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
			followers: formatNumber(item.followers.total),
			genres: item.genres,
			id: item.id,
			image_url: getImageUrl(item.images),
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
		image: getImageUrl(response.images),
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
		image_url: getImageUrl(result.images),
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
			image_url: getImageUrl(item.images),
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
		followers: formatNumber(response.followers.total),
		id: response.id,
		image_url: getImageUrl(response.images),
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
			album_name: item.track.album.name,
			artists: joinArtists(item.track.artists),
			duration: formatDuration(item.track.duration_ms),
			duration_ms: item.track.duration_ms,
			id: item.track.id,
			image_url: getImageUrl(item.track.album.images),
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
		artists: joinArtists(response.artists),
		genres: response.genres,
		id: response.id,
		image_url: getImageUrl(response.images),
		name: response.name,
		player_uri: response.uri,
		release_date: response.release_date,
		release_year: getYear(response.release_date),
		total_length: getAlbumLength(response.tracks.items),
		total_tracks: response.tracks.total,
		tracks: response.tracks.items.map(item => ({
			artists: joinArtists(item.artists),
			duration: formatDuration(item.duration_ms),
			duration_ms: item.duration_ms,
			id: item.id,
			name: item.name,
			player_uri: item.uri,
			type: item.type,
			image_url: getImageUrl(response.images),
			album_name: response.name,
		})),
		type: response.album_type,
	}
	return album;
}

/**
 * Get an artist from the Spotify catalog
 *
 * @param {*} artist_id The id of the artist
 * @returns {Object} Artist object
 */
export const getArtist = async (artist_id) => {
	const response = await get('artists/' + artist_id);

	const artist = {
		followers: formatNumber(response.followers.total),
		genres: response.genres,
		id: response.id,
		image_url: getImageUrl(response.images),
		name: response.name,
		player_uri: response.uri,
		type: response.type,
	}

	return artist;
}

/**
 * Get a list of top tracks of an artist from the Spotify catalog, for a specific country
 *
 * @param {*} artist_id The id of the artist
 * @returns {Object} Track object
 */
export const getArtistTopTracks = async (artist_id) => {
	const res = await get('artists/' + artist_id + '/top-tracks', {
		market: 'from_token'
	});

	const topTracks = res.tracks.map(track => ({
		album_name: track.album.name,
		artists: joinArtists(track.artists),
		duration: formatDuration(track.duration_ms),
		duration_ms: track.duration_ms,
		id: track.id,
		image_url: getImageUrl(track.album.images),
		name: track.name,
		player_uri: track.uri,
		type: 'track',
	}))

	return topTracks;
}

/**
 * Get Spotify catalog information about artists similar to a given artist
 *
 * @param {*} artist_id The id of the artist
 * @returns {Object} Artists object
 */
export const getArtistRelatedArtists = async (artist_id) => {
	const response = await get(`artists/${artist_id}/related-artists`);
	const artist = await getArtist(artist_id);

	const relatedArtists = {};
	relatedArtists.artist = artist.name;
	relatedArtists.related = response.artists.map(item => ({
		followers: formatNumber(item.followers.total),
		genres: item.genres,
		id: item.id,
		image_url: getImageUrl(item.images),
		name: item.name,
		player_uri: item.uri,
		type: item.type,
	}))

	return relatedArtists;
}

/**
 * Get Spotify catalog information about an artist’s albums
 *
 * @param {*} artist_id The id of the artist
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Albums object
 */
export const getArtistAlbums = async (artist_id, options = {}) => {
	const response = await get('artists/' + artist_id + '/albums', {
		...options,
		market: 'from_token'
	});

	const albums = {
		...response,
		items: response.items.map(item => ({
			artists: joinArtists(item.artists),
			id: item.id,
			image_url: getImageUrl(item.images),
			name: item.name,
			player_uri: item.uri,
			release_date: getYear(item.release_date),
			total_tracks: item.total_tracks,
			type: item.album_type
		}))
	}

	return albums;
}

/**
 * Get a list of Spotify featured playlists
 *
 * @param {Object} options A JSON object with options that can be passed
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
				image_url: getImageUrl(item.images),
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
 * @param {Object} options A JSON object with options that can be passed
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
			artists: joinArtists(item.artists),
			id: item.id,
			image_url: getImageUrl(item.images),
			name: item.name,
			player_uri: item.uri,
			release_date: getYear(item.release_date),
			type: item.album_type,
		}))
	};

	return releases;
}

/**
 * Get a list of categories used to tag items in Spotify
 *
 * @param {Object} options A JSON object with options that can be passed
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
			type: 'category'
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
	if (!artists.length && !tracks.length) {
		return [];
	}
	// get IDs for seed artists and tracks.
	const seed_artists = artists.slice(0, 3).map(item => item.id).join(',');
	const seed_tracks = tracks.slice(0, 2).map(item => item.id).join(',');

	const response = await get('recommendations', {
		market: 'from_token', seed_artists, seed_tracks
	});

	const recommendations = response.tracks.map(track => ({
		album_name: track.album.name,
		artists: joinArtists(track.artists),
		duration_ms: track.duration_ms,
		id: track.id,
		image_url: getImageUrl(track.album.images),
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
 * @param {Object} options A JSON object with options that can be passed
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
			image_url: getImageUrl(item.images),
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
 * @param {Object} options A JSON object with options that can be passed
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
			artists: joinArtists(item.album.artists),
			genres: item.album.genres,
			id: item.album.id,
			image_url: getImageUrl(item.album.images),
			name: item.album.name,
			player_uri: item.album.uri,
			release_date: getYear(item.album.release_date),
			total_tracks: item.album.tracks.total,
			total_length: getAlbumLength(item.album.tracks.items),
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
			followers: formatNumber(item.followers.total),
			genres: item.genres,
			id: item.id,
			image_url: getImageUrl(item.images),
			name: item.name,
			player_uri: item.uri,
			type: item.type,
		})),
	}

	return artists;
}

/**
 * Get current user's saved tracks
 *
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Tracks object
 */
export const getMySavedTracks = async (options = {}) => {
	const response = await get('me/tracks', {
		market: 'from_token',
		...options,
	});

	const tracks = {
		...response,
		items: response.items.map(item => ({
			album_name: item.track.album.name,
			artists: joinArtists(item.track.artists),
			duration: formatDuration(item.track.duration_ms),
			duration_ms: item.track.duration_ms,
			id: item.track.id,
			image_url: getImageUrl(item.track.album.images),
			name: item.track.name,
			player_uri: item.track.uri,
			type: 'track'
		}))
	}

	return tracks;
}

export const getRecentlyPlayed = async (options = {}) => {
	const response = await get('me/player/recently-played', options);

	const tracks = {
		...response,
		items: response.items.map(item => ({
			album_name: item.track.album.name,
			artists: joinArtists(item.track.artists),
			duration: formatDuration(item.track.duration_ms),
			duration_ms: item.track.duration_ms,
			id: item.track.id,
			image_url: getImageUrl(item.track.album.images),
			name: item.track.name,
			player_uri: item.track.uri,
			type: 'track'
		}))
	}

	return tracks;
}

/**
 * Get Spotify catalog information about artists, albums, tracks or playlists that match a keyword string
 *
 * @param {String} query The search query
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Search results object
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
				artists: joinArtists(item.artists),
				id: item.id,
				image_url: getImageUrl(item.images),
				name: item.name,
				player_uri: item.uri,
				release_date: getYear(item.release_date),
				total_tracks: item.total_tracks,
				type: item.album_type,
			}))
		},
		{
			...response.artists,
			type: 'artists',
			items: response.artists.items.map(item => ({
				followers: formatNumber(item.followers.total),
				genres: item.genres,
				id: item.id,
				image_url: getImageUrl(item.images),
				name: item.name,
				player_uri: item.uri,
				type: item.type,
			}))
		},
		{
			...response.tracks,
			type: 'tracks',
			items: response.tracks.items.map(item => ({
				album_name: item.album.name,
				artists: joinArtists(item.artists),
				duration: formatDuration(item.duration_ms),
				duration_ms: item.duration_ms,
				id: item.id,
				image_url: getImageUrl(item.album.images),
				name: item.name,
				player_uri: item.uri,
				release_date: item.album.release_date,
				type: item.type,
			}))
		}
	]

	return results;
}

/**
 * Get albums from the Spotify catalog according to a query.
 *
 * @param {String} query The search query
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Search results object
 */
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
			artists: joinArtists(item.artists),
			id: item.id,
			image_url: getImageUrl(item.images),
			name: item.name,
			player_uri: item.uri,
			release_date: getYear(item.release_date),
			total_tracks: item.total_tracks,
			type: item.album_type,
		}))
	}

	return albums;
}

/**
 * Get artists from the Spotify catalog according to a query.
 *
 * @param {String} query The search query
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Search results object
 */
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
			followers: formatNumber(item.followers.total),
			genres: item.genres,
			id: item.id,
			image_url: getImageUrl(item.images),
			name: item.name,
			player_uri: item.uri,
			type: item.type,
		}))
	};

	return artists;
}

/**
 * Get tracks from the Spotify catalog according to a query.
 *
 * @param {String} query The search query
 * @param {Object} options A JSON object with options that can be passed
 * @returns {Object} Search results object
 */
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
			album_name: item.album.name,
			artists: joinArtists(item.artists),
			duration: formatDuration(item.duration_ms),
			duration_ms: item.duration_ms,
			id: item.id,
			image_url: getImageUrl(item.album.images),
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
 * @param {String} device_id The id of the user’s currently active device.
 * @param {Object} options A JSON object with options that can be passed.
 */
export const play = async (device_id, options = {}) => {
	const response = await put(`me/player/play?device_id=${device_id}`, options);
	return response;
}

/**
 * Pause playback on the user’s account.
 *
 * @param {String} device_id The id of the user’s currently active device.
 */
export const pause = async (device_id) => {
	const response = await put('me/player/pause', device_id);
	return response;
}

/**
 * Skips to next track in the user’s queue.
 *
 * @param {String} device_id The id of the user’s currently active device.
 */
export const skipToNext = async (device_id) => {
	const response = await put('me/player/next', device_id);
	return response;
}

/**
 * Skips to previous track in the user’s queue.
 *
 * @param {String} device_id The id of the user’s currently active device.
 */
export const skipToPrevious = async (device_id) => {
	const response = await put('me/player/previous', device_id);
	return response;
}

/**
 * Set the repeat mode for the user’s playback.
 *
 * @param {String} device_id The id of the user’s currently active device.
 * @param {String} state A string set to 'track', 'context' or 'off'.
 * @returns
 */
export const setRepeat = async (device_id, state) => {
	return await put(`me/player/repeat?device_id=${device_id}&state=${state}`);
}


/**
 * Toggle shuffle on or off for user’s playback.
 *
 * @param {String} device_id The id of the user’s currently active device.
 * @param {Boolean} state Whether or not to shuffle user's playback.
 */
export const setShuffle = async (device_id, state) => {
	return await put(`me/player/shuffle?device_id=${device_id}&state=${state}`);
}

/**
 * Get information about the user’s current playback state, including track, track progress, and active device.
 *
 * @returns {Object} Information about the current playback.
 */
export const getCurrentPlaybackState = async () => {
	return await get('me/player', { market: 'from_token' });
}

/**
 * Get all user info
 *
 * @returns {Object} User object
 */
export const getUserInfo = async () => {
	const endpoints = [
		getCurrentUser(),
		getTopTracks(),
		getTopArtists({ limit: 18 }),
		getUserPlaylists(),
		getDiscoverWeekly(),
		getUsersSavedAlbums(),
		getFollowedArtists(),
	];

	return await Promise.all(endpoints);
};

/**
 * Get playlist details
 *
 * @param {String} playlistId The id of the playlist
 * @returns
 */
export const getPlaylistDetails = async (playlistId) => {
	const endpoints = [
		getPlaylist(playlistId),
		getPlaylistTracks(playlistId)
	];

	return await Promise.all(endpoints);
}

/**
 * Get artist details
 *
 * @param {String} artistId The id of the artist
 */
export const getArtistDetails = async (artistId) => {
	const endpoints = [
		getArtist(artistId),
		getArtistTopTracks(artistId),
		getArtistRelatedArtists(artistId),
		getArtistAlbums(artistId)
	];

	return await Promise.all(endpoints);
}

/**
 * Get artists discography
 *
 * @param {String} artistId The id of the artist
 */
export const getArtistDiscography = async (artistId) => {
	const endpoints = [
		getArtistAlbums(artistId, { include_groups: 'album' }),
		getArtistAlbums(artistId, { include_groups: 'compilation' }),
		getArtistAlbums(artistId, { include_groups: 'single' }),
	];

	return await Promise.all(endpoints);
}

/**
 * Get recommendations and new releases
 *
 * @param {*} topArtist
 * @param {*} topTracks
 *
 * @returns
 */
export const getDiscoverNewMusic = async (topArtist, topTracks) => {
	const endpoints = [
		getRecommendations(topArtist, topTracks),
		getNewReleases(),
		getFeaturedPlaylists(),
		getCategories(),
	];

	return await Promise.all(endpoints);
}

/**
 *
 * @returns
 */
export const getCategoryDetails = async (categoryId, options = {}) => {
	const endpoints = [
		getCategory(categoryId),
		getCategoryPlaylists(categoryId, options)
	];

	return await Promise.all(endpoints);
}
