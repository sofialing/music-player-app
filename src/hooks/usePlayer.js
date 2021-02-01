import { useAuth } from '../contexts/AuthContext';
import { usePlayback } from '../contexts/PlaybackContext';

const usePlayer = () => {
	const { spotify } = useAuth();
	const { device_id } = usePlayback();

	const pauseTrack = uri => {
		return spotify.pause({ device_id, uris: [uri] });
	}

	const playTrack = uri => {
		return spotify.play({ device_id, uris: [uri] });
	}

	const playContext = uri => {
		return spotify.play({ device_id, context_uri: uri });
	}

	return { pauseTrack, playTrack, playContext }
}

export default usePlayer;
