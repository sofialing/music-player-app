import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import usePlayer from 'hooks/usePlayer';

const PlayerControls = ({ is_playing, is_desktop = false }) => {
	const { togglePlay, nextTrack, prevTrack } = usePlayer();

	return (
		<div className="player-controls">
			{is_desktop && <button aria-label="Shuffle tracks">
				<ShuffleIcon />
			</button>}
			<button aria-label="Previous track" onClick={prevTrack}>
				<SkipPreviousIcon />
			</button>
			{is_playing ?
				<button className="pause" aria-label="Pause" onClick={togglePlay}>
					<PauseIcon />
				</button> :
				<button className="play" aria-label="Play" onClick={togglePlay}>
					<PlayArrowIcon />
				</button>
			}
			<button aria-label="Next track" onClick={nextTrack} >
				<SkipNextIcon />
			</button>
			{is_desktop && <button aria-label="Activate repeat">
				<RepeatIcon style={{ fontSize: 24 }} />
			</button>}
		</div>
	)
}

export default PlayerControls;
