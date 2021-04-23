import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import usePlayerControls from 'hooks/usePlayerControls';
import { usePlayback } from 'contexts/PlaybackContext';

const PlayButton = ({ uri, type }) => {
	const { playback_state: { context, current_track, is_playing } } = usePlayback();
	const { playContext, playTrack, pausePlayback } = usePlayerControls();

	const handlePlay = (e) => {
		e.preventDefault();

		return type === 'track'
			? playTrack(uri)
			: playContext(uri)
	}
	const handlePause = (e) => {
		e.preventDefault();

		return pausePlayback();
	}

	return is_playing && context && (context.uri === uri || current_track.uri === uri) ? (
		<button className="play-btn is-active" aria-label={`Pause ${type}`} onClick={handlePause}>
			<PauseIcon />
			<span>Pause</span>
		</button>
	) : (
		<button className="play-btn" aria-label={`Play ${type}`} onClick={handlePlay}>
			<PlayArrowIcon />
			<span>Play</span>
		</button>
	)
}

export default PlayButton;
