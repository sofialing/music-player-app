import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { usePlayback } from 'contexts/PlaybackContext';
import CurrentTrack from './partials/CurrentTrack';
import PlayerControls from './partials/PlayerControls';
import PlaybackBar from './partials/PlaybackBar';

const NowPlayingBarMobile = ({ currentState }) => {
	const { dispatch, playback_state: { current_track } } = usePlayback();

	const expandPlayer = () => {
		dispatch({ type: 'SET_DISPLAY_PLAYER', display_player: true })
	}

	return (
		<footer className="now-playing-bar mobile">
			<PlaybackBar currentState={currentState} duration={current_track.duration_ms} />
			<div className="now-playing-bar__inner">
				<CurrentTrack track={current_track} />
				<PlayerControls />
				<button className="expand" aria-label="Expand player" onClick={expandPlayer}>
					<ExpandLessIcon />
				</button>
			</div>
		</footer>
	)
}

export default NowPlayingBarMobile;
