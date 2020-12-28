import { useEffect } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import noImage from '../../assets/images/no-image.png'
import { usePlayer } from '../../contexts/PlayerContext';

const NowPlayingBar = () => {
	const { current_track, isPlaying, spotify } = usePlayer();

	useEffect(() => {
		if (!current_track) return;
		console.log('play track', current_track.uri);
		spotify.play({ uris: [current_track.uri] })
			.then(res => console.log(res))
			.catch(error => console.log(error))
	}, [spotify, current_track])

	const onPauseTrack = () => {
		console.log('pause')
	}

	const onPlayTrack = () => {
		console.log('play')
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
					{isPlaying ? <PauseCircleOutlineIcon onClick={onPauseTrack} /> : <PlayCircleOutlineIcon onClick={onPlayTrack} />}
				</div>
			</div>
		</div>
	)
}

export default NowPlayingBar
