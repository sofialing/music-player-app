import { Link } from 'react-router-dom';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const NowPlayingModal = () => {
	return (
		<div className="now-playing-modal container">
			<header>
				<small>Now playing</small>
				<p>Du & jag döden</p>
			</header>
			<img className="album-cover" src="https://www.bengans.se/bilder/artiklar/555914.jpg" alt="" />
			<div className="now-playing">
				<h2 className="track-title">Palace & Main</h2>
				<p className="artist">Kent &middot; Du & jag döden</p>
			</div>
			<div className="player-controls">
				<SkipPreviousIcon style={{ fontSize: 30 }} />
				<PauseCircleOutlineIcon style={{ fontSize: 65 }} />
				<SkipNextIcon style={{ fontSize: 30 }} />
			</div>
			<div className="playback-bar">
				<div className="progress-bar">
					<div className="progress-bar__wrapper">
						<div className="progress-bar__progress"></div>
						<button className="progress-bar__slider"></button>
					</div>
				</div>
				<div className="progress-time">
					<small>01:45</small>
					<small>04:05</small>
				</div>
			</div>
		</div>
	)
}

export default NowPlayingModal
