import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import moment from 'moment';
import noImage from '../../assets/images/no-image.png'
import { usePlayer } from '../../contexts/PlayerContext';

const TrackListItem = ({ track, album, displayAlbumTitle = true }) => {
	const imageSrc = album.images.length ? album.images[album.images.length - 1]['url'] : noImage;
	const { dispatch } = usePlayer();

	const handlePlayTrack = (e) => {
		dispatch({
			type: 'SET_CURRENT_TRACK', track: {
				name: track.name,
				artists: track.artists,
				album: album.name,
				images: album.images,
				duration: track.duration_ms,
				url: track.preview_url
			}
		});
		dispatch({ type: 'SET_PLAYING', playing: false })
		const audio = new Audio(track.preview_url);
		audio.play();
		dispatch({ type: 'SET_AUDIO', audio })
		dispatch({ type: 'SET_PLAYING', playing: true })
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
