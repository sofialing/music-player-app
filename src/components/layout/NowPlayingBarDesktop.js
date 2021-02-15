import { useEffect, useState } from 'react';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import noImage from 'assets/images/no-image.png'
import { usePlayback } from 'contexts/PlaybackContext';
import { formatTime, getArtists } from 'utils';
import './NowPlayingBarDesktop.scss';

const NowPlayingBarDesktop = () => {
	const [current, setCurrent] = useState(0);
	const [progress, setProgress] = useState(0);
	const { current_track, is_playing, player } = usePlayback();
	const imageSrc = current_track && current_track.album.images.length ? current_track.album.images[0]['url'] : noImage;

	useEffect(() => {
		let interval;
		if (is_playing) {
			interval = setInterval(() => {
				player.getCurrentState().then(({ position }) => {
					setCurrent(position);
					setProgress(Math.min(1, position / current_track.duration_ms));
				})
			}, 1000);
		}
		else {
			clearInterval(interval)
		}

		return () => clearInterval(interval);
	}, [current_track, is_playing, player])

	const prevTrack = async () => {
		await player.previousTrack();
		setCurrent(0);
		setProgress(0);
	}


	const nextTrack = async () => {
		await player.nextTrack();
		setCurrent(0);
		setProgress(0);
	}

	const togglePlay = async () => {
		await player.togglePlay();
	}

	return current_track && (
		<footer className="now-playing-bar desktop">
			<div className="now-playing-bar__left">
				<img src={imageSrc} alt="album cover" />
				<div className="current-track">
					<div className="track-name">{current_track.name}</div>
					<div className="artist">{getArtists(current_track.artists)}</div>
				</div>
			</div>
			<div className="now-playing-bar__center">
				<div className="player-controls">
					<button title="Shuffle" aria-label="Shuffle tracks">
						<ShuffleIcon className="shuffle" />
					</button>
					<button title="Previous" aria-label="Previous track">
						<SkipPreviousIcon className="control" onClick={prevTrack} />
					</button>
					{is_playing ?
						<button title="Pause" aria-label="Pause">
							<PauseCircleOutlineIcon className="pause" onClick={togglePlay} />
						</button> :
						<button title="Play" aria-label="Play">
							<PlayCircleOutlineIcon className="play" onClick={togglePlay} />
						</button>
					}
					<button title="Next" aria-label="Next track">
						<SkipNextIcon className="control" onClick={nextTrack} />
					</button>
					<button title="Activate reapeat" aria-label="Activate repeat">
						<RepeatIcon className="repeat" />
					</button>
				</div>
				<div className="playback-bar">
					<div className="playback-bar__progress-time">
						{formatTime(current)}
					</div>
					<div className="progress-bar">
						<div className="progress-bar__wrapper">
							<div className="progress-bar__progress" style={{ transform: `translateX(-${100 - 100 * progress}%)` }}></div>
							{/* <button className="progress-bar__slider"></button> */}
						</div>
					</div>
					<div className="playback-bar__progress-time">
						{formatTime(current_track.duration_ms)}
					</div>
				</div>
			</div>
			<div className="now-playing-bar__right">
				<div className="extra-controls">
					<button title="Add to library" aria-label="Add to library">
						<FavoriteBorderIcon />
					</button>
					<button title="Expand player" aria-label="Expand player">
						<UnfoldMoreIcon />
					</button>
				</div>
			</div>
		</footer>
	)
}

export default NowPlayingBarDesktop;
