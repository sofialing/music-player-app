import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { usePlayback } from 'contexts/PlaybackContext';
import PlayerControls from './partials/PlayerControls';
import CurrentTrack from './partials/CurrentTrack';
import PlaybackBar from './partials/PlaybackBar';


const NowPlayingBarDesktop = ({ currentPosition, progress }) => {
	const { current_track, is_playing, dispatch } = usePlayback();

	const expandPlayer = () => {
		dispatch({ type: 'SET_DISPLAY_PLAYER', display_player: true })
	}

	return (
		<footer className="now-playing-bar desktop">
			<div className="now-playing-bar__column">
				<CurrentTrack track={current_track} />
			</div>
			<div className="now-playing-bar__column">
				<PlayerControls is_playing={is_playing} is_desktop={true} />
				<PlaybackBar currentPosition={currentPosition} progress={progress} duration={current_track.duration_ms} />
			</div>
			<div className="now-playing-bar__column">
				<button class="expand" aria-label="Expand player" onClick={expandPlayer}>
					<UnfoldMoreIcon />
				</button>
			</div>
		</footer>
	)
}

export default NowPlayingBarDesktop;
