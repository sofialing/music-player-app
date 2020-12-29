import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import moment from 'moment';
import noImage from '../../assets/images/no-image.png'
import { usePlayback } from '../../contexts/PlaybackContext';

const TrackListItem = ({ track, album, displayAlbumTitle = true }) => {
	const imageSrc = album.images.length ? album.images[album.images.length - 1]['url'] : noImage;
	const { dispatch } = usePlayback();

	const handlePlayTrack = (e) => {
		dispatch({
			type: 'SET_CURRENT_TRACK', current_track: {
				name: track.name,
				artists: track.artists,
				album: album.name,
				images: album.images,
				duration: track.duration_ms,
				uri: track.uri
			}
		});
		dispatch({ type: 'SET_IS_PLAYING', is_playing: true })
	}

	return (
		<li className="track-list-item" onDoubleClick={handlePlayTrack}>
			<img className="track-list-item__image" src={imageSrc} alt={`album cover for "${album.name}"`} />
			<div className="track-list-item__details">
				<h2>{track.name}</h2>
				<p>
					{track.artists.map((artist) => artist.name).join(', ')} &middot; {' '}
					{displayAlbumTitle ? album.name : moment(track.duration_ms).format('mm:ss')}
				</p>
			</div>
			<PlayCircleOutlineIcon onClick={handlePlayTrack} />
		</li>
	)
}

export default TrackListItem
