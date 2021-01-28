import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import noImage from 'assets/images/no-image.png'
import { usePlayback } from 'contexts/PlaybackContext';
import ProgressBar from 'components/partials/ProgressBar';
import { getArtists } from 'utils';
import './NowPlayingBarMobile.scss';

const NowPlayingBarMobile = () => {
	const { current_track, is_playing, player, dispatch } = usePlayback();
	const imageSrc = current_track && current_track.album.images.length ? current_track.album.images[0]['url'] : noImage;

	const togglePlay = async () => {
		await player.togglePlay();
	}

	const openPlayer = () => {
		dispatch({ type: 'SET_DISPLAY_PLAYER', display_player: true })
	}

	return current_track && (
		<footer className="now-playing-bar mobile">
			<ProgressBar />
			<div className="now-playing-bar__inner">
				<img src={imageSrc} alt="album cover" />
				<div className="current-track">
					<div className="track-name">{current_track.name}</div>
					<div className="artist">{getArtists(current_track.artists)}</div>
				</div>
				<div className="player-controls">
					{is_playing ? <PauseCircleOutlineIcon onClick={togglePlay} /> : <PlayCircleOutlineIcon onClick={togglePlay} />}
					<ExpandLessIcon onClick={openPlayer} />
				</div>
			</div>
		</footer>
	)
}

export default NowPlayingBarMobile
