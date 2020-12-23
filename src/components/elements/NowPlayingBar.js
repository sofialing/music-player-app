import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import noImage from '../../assets/images/no-image.png'
import { usePlayer } from '../../contexts/PlayerContext';

const NowPlayingBar = () => {
	const { current_track, isPlaying, audio, dispatch } = usePlayer();

	const handlePause = () => {
		audio.pause();
		dispatch({ type: 'SET_PLAYING', playing: false })
	}
	const handlePlay = () => {
		audio.play();
		dispatch({ type: 'SET_PLAYING', playing: true })
	}

	return current_track && (
		<div className="now-playing-bar">
			<div className="progress-bar">
				<div className="progress-bar__wrapper">
					<div className="progress-bar__progress"></div>
				</div>
			</div>
			<div className="now-playing-bar__inner">
				<img src={current_track.images.length ? current_track.images[current_track.images.length - 1]['url'] : noImage} alt="" />
				<div className="current-track">
					<small className="track-name">{current_track.name}</small>
					<small className="artist">{current_track.artists.map((artist) => artist.name).join(', ')}</small>
				</div>
				<div className="icons">
					<FavoriteBorderIcon />
					{isPlaying ? <PauseCircleOutlineIcon onClick={handlePause} /> : <PlayCircleOutlineIcon onClick={handlePlay} />}
				</div>
			</div>
		</div>
	)
}

export default NowPlayingBar
