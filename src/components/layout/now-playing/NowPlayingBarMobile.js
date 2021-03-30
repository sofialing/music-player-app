import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { usePlayback } from 'contexts/PlaybackContext';
import CurrentTrack from './partials/CurrentTrack';
import PlayerControls from './partials/PlayerControls';
import PlaybackBar from './partials/PlaybackBar';

const NowPlayingBarMobile = ({ currentPosition, progress }) => {
	const { current_track, is_playing, dispatch } = usePlayback();

	const expandPlayer = () => {
		dispatch({ type: 'SET_DISPLAY_PLAYER', display_player: true })
	}

	return (
		<footer className="now-playing-bar mobile">
			<PlaybackBar currentPosition={currentPosition} progress={progress} duration={current_track.duration_ms} />
			<div className="now-playing-bar__inner">
				<CurrentTrack track={current_track} />
				<PlayerControls is_playing={is_playing} />
				<button className="expand" aria-label="Expand player" onClick={expandPlayer}>
					<ExpandLessIcon />
				</button>
			</div>
		</footer>
	)
}

export default NowPlayingBarMobile;
