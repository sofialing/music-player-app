import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import noImage from '../../assets/images/no-image.png'
import { usePlayback } from '../../contexts/PlaybackContext';
import ProgressBar from '../elements/ProgressBar';

const NowPlayingBar = () => {
	const { current_track, is_playing, player, dispatch } = usePlayback();
	const imageSrc = current_track && current_track.album.images.length ? current_track.album.images[0]['url'] : noImage;

	const togglePlay = async () => {
		await player.togglePlay();
	}

	return current_track && (
		<footer className="now-playing-bar">
			<ProgressBar />
			<div className="now-playing-bar__inner">
				<img src={imageSrc} alt="" />
				<div className="current-track">
					<small className="track-name">{current_track.name}</small>
					<small className="artist">{current_track.artists.map((artist) => artist.name).join(', ')}</small>
				</div>
				<div className="icons">
					{is_playing ? <PauseCircleOutlineIcon onClick={togglePlay} /> : <PlayCircleOutlineIcon onClick={togglePlay} />}
					<ExpandLessIcon onClick={() => dispatch({ type: 'SET_DISPLAY_PLAYER', display_player: true })} />
				</div>
			</div>
		</footer>
	)
}

export default NowPlayingBar
