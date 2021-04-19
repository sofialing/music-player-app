import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import usePlayer from 'hooks/usePlayer';
import { usePlayback } from 'contexts/PlaybackContext';

const PlayButton = ({ uri, type }) => {
	const { context, is_playing, current_track } = usePlayback();
	const { playContext, playTrack, pausePlayback } = usePlayer();

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
