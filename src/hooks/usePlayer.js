import { usePlayback } from '../contexts/PlaybackContext';
import { play, pause } from 'services/spotifyAPI';

const usePlayer = () => {
	const { device_id, player } = usePlayback();

	const pauseTrack = uri => {
		return pause({ device_id, uris: [uri] });
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

	return { pauseTrack, playTrack, playContext, nextTrack, prevTrack, togglePlay, disconnectPlayer }
}

export default usePlayer;
