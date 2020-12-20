import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PauseIcon from '@material-ui/icons/Pause';

const NowPlayingBar = () => {
	return (
		<div className="now-playing-bar">
			<div className="progress-bar">
				<div className="progress-bar__wrapper">
					<div className="progress-bar__progress"></div>
				</div>
			</div>
			<div className="now-playing-bar__inner">
				<img src="https://via.placeholder.com/50x50" alt="" />
				<div className="current-track">
					<small className="track-name">Track name</small>
					<small className="artist">Artist</small>
				</div>
				<div className="icons">
					<FavoriteBorderIcon />
					<PauseIcon />
				</div>
			</div>
		</div>
	)
}

export default NowPlayingBar
