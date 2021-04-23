import { usePlayback } from '../contexts/PlaybackContext';
import { play, pause, setRepeat, setShuffle } from 'services/spotifyAPI';

const usePlayerControls = () => {
	const { device_id, player } = usePlayback();

	/**
	 * Disconnect the current session Web Playback SDK has with Spotify.
	 */
	const disconnectPlayer = () => player.disconnect();

	/**
	 * Pause playback on the current device.
	 */
	const pausePlayback = () => pause(device_id);

	/**
	 * Play a context on the current device.
	 *
	 * @param {String} uri The uri of the context to play.
	 */
	const playContext = uri => play(device_id, { context_uri: uri });

	/**
	 * Play a track on the current device.
	 *
	 * @param {String} uri The uri of the item to play.
	 */
	const playTrack = uri => play(device_id, { uris: [uri] });

	/**
	 * Set the repeat mode for the user’s playback.
	 *
	 * @param {String} state String set to 'track', 'context' or 'off'.
	 */
	const repeat = state => setRepeat(device_id, state);

	/**
	 * Toggle shuffle on or off for user’s playback.
	 *
	 * @param {Boolean} state Whether or not to shuffle user's playback.
	 */
	const shuffle = state => setShuffle(device_id, state);

	/**
	 * Skip to next track in the user’s queue.
	 */
	const skipToNext = () => player.nextTrack();

	/**
	 * Skip to previous track in the user’s queue.
	 */
	const skipToPrev = () => player.previousTrack();

	/**
	 * Toggle play/pause on current device.
	 */
	const togglePlay = () => player.togglePlay();

	return {
		disconnectPlayer,
		pausePlayback,
		playContext,
		playTrack,
		repeat,
		shuffle,
		skipToNext,
		skipToPrev,
		togglePlay
	}
}

export default usePlayerControls;
