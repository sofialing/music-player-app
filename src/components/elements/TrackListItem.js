import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import moment from 'moment';
import noImage from '../../assets/images/no-image.png'

const TrackListItem = ({ track, album, displayAlbumTitle = true }) => {
	const imageSrc = album.images.length ? album.images[album.images.length - 1]['url'] : noImage;
	return (
		<li className="track-list-item">
			<img className="track-list-item__image" src={imageSrc} alt={`album cover for "${album.name}"`} />
			<div className="track-list-item__details">
				<h2>{track.name}</h2>
				<p>
					{track.artists.map((artist) => artist.name).join(', ')} &middot; {' '}
					{displayAlbumTitle ? album.name : moment(track.duration_ms).format('mm:ss')}
				</p>
			</div>
			<PlayCircleOutlineIcon />
		</li>
	)
}

export default TrackListItem
