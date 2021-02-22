import { usePlayback } from '../contexts/PlaybackContext';
import { play, pause } from 'services/spotifyAPI';

const usePlayer = () => {
	const { device_id } = usePlayback();

	const pauseTrack = uri => {
		return pause({ device_id, uris: [uri] });
	}

	const playTrack = uri => {
		return play(device_id, { uris: [uri] });
	}

	const playContext = uri => {
		return play(device_id, { context_uri: uri });
	}

	return { pauseTrack, playTrack, playContext }
}

export default usePlayer;
