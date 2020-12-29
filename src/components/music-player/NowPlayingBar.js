import { useEffect } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import noImage from '../../assets/images/no-image.png'
import { useAuth } from '../../contexts/AuthContext';
import { usePlayback } from '../../contexts/PlaybackContext';

const NowPlayingBar = () => {
	const { spotify } = useAuth();
	const { device_id, current_track, is_playing } = usePlayback();

	useEffect(() => {
		if (!current_track) return;
		console.log('play track', current_track.uri);
		spotify.play({ device_id, uris: [current_track.uri] })
			.then(res => console.log(res))
			.catch(error => console.log(error))
	}, [spotify, current_track, device_id])

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
					{is_playing ? <PauseCircleOutlineIcon onClick={onPauseTrack} /> : <PlayCircleOutlineIcon onClick={onPlayTrack} />}
				</div>
			</div>
		</div>
	)
}

export default NowPlayingBar
