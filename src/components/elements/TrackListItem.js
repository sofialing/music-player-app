import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import moment from 'moment';
import noImage from '../../assets/images/no-image.png'
import usePlayer from '../../hooks/usePlayer'

const TrackListItem = ({ track, album, displayAlbumTitle = true }) => {
	const imageSrc = album.images.length ? album.images[album.images.length - 1]['url'] : noImage;
	const { playTrack } = usePlayer();

	return (
		<li className="track-list-item" onDoubleClick={() => playTrack(track.uri)}>
			<img className="track-list-item__image" src={imageSrc} alt={`album cover for "${album.name}"`} />
			<div className="track-list-item__details">
				<h2>{track.name}</h2>
				<p>
					{track.artists.map((artist) => artist.name).join(', ')} &middot; {' '}
					{displayAlbumTitle ? album.name : moment(track.duration_ms).format('mm:ss')}
				</p>
			</div>
			<PlayCircleOutlineIcon onClick={() => playTrack(track.uri)} />
		</li>
	)
}

export default TrackListItem
