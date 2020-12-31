/**
 * Helper Functions
 */
import moment from 'moment';

export const formatNumber = number => {
	return parseInt(number).toLocaleString();
}

export const formatTime = time_ms => {
	return moment(time_ms).format('mm:ss');
}

export const getMinutes = time_ms => {
	return moment(time_ms).format('m');
}

export const getArtists = artist_array => {
	return artist_array.map((artist) => artist.name).join(', ');
}

export const getYear = date => {
	return date.split('-')[0];
}

export const getAlbumLength = tracks => {
	const total_ms = tracks.items
		.map(track => track.duration_ms)
		.reduce((total, num) => total + num);

	return getMinutes(total_ms);
}

export const getTracks = total => {
	return total > 2 ? `${total} tracks` : `${total} track`
}
