import { usePlayback } from '../contexts/PlaybackContext';
import { play, pause } from 'services/spotifyAPI';

const usePlayer = () => {
	const { device_id, player } = usePlayback();

	const pausePlayback = () => {
		return pause(device_id);
	}

	const playTrack = uri => {
		return play(device_id, { uris: [uri] });
	}

	const playContext = uri => {
		return play(device_id, { context_uri: uri });
	}

	const nextTrack = () => {
		return player.nextTrack();
	}

	const prevTrack = () => {
		return player.previousTrack();
	}
	const togglePlay = () => {
		return player.togglePlay();
	}

	const disconnectPlayer = () => {
		return player.disconnect();
	}

	return { pausePlayback, playTrack, playContext, nextTrack, prevTrack, togglePlay, disconnectPlayer }
}

export default usePlayer;
