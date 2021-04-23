import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import usePlayerControls from 'hooks/usePlayerControls';
import { usePlayback } from 'contexts/PlaybackContext';

const ToggleButton = ({ track }) => {
	const { playback_state: { current_track, is_playing } } = usePlayback();
	const { pausePlayback, playTrack } = usePlayerControls();

	return current_track && is_playing && current_track.id === track.id ?
		<button aria-label="Pause" title="Pause" type="button" onClick={() => pausePlayback()}>
			<PauseCircleOutlineIcon />
		</button> :
		<button aria-label="Play" title="Play" type="button" onClick={() => playTrack(track.player_uri)}>
			<PlayCircleOutlineIcon />
		</button>
}

export default ToggleButton;
