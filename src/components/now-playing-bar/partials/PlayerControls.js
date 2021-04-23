import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { usePlayback } from 'contexts/PlaybackContext';
import usePlayerControls from 'hooks/usePlayerControls';

const PlayerControls = () => {
	const { playback_state: { is_playing, prev_tracks, next_tracks, shuffle_mode, repeat_mode } } = usePlayback();
	const { togglePlay, skipToNext, skipToPrev, repeat, shuffle } = usePlayerControls();

	return (
		<div className="player-controls">
			<button aria-label="Enable shuffle" className={shuffle_mode ? 'is-active' : ''} onClick={() => shuffle(!shuffle_mode)}>
				<ShuffleIcon />
			</button>
			<button aria-label="Previous track" className="prev" disabled={!prev_tracks.length} onClick={skipToPrev}>
				<SkipPreviousIcon />
			</button>
			<button className="toggle-play" aria-label={is_playing ? 'Pause' : 'Play'} onClick={togglePlay}>
				{is_playing ? <PauseIcon /> : <PlayArrowIcon />}
			</button>
			<button aria-label="Next track" className="next" disabled={!next_tracks.length} onClick={skipToNext}>
				<SkipNextIcon />
			</button>
			<button aria-label="Enable repeat" className={repeat_mode ? 'is-active' : ''} onClick={() => repeat(repeat_mode ? 'off' : 'context')}>
				<RepeatIcon />
			</button>
		</div>
	)
}

export default PlayerControls;
