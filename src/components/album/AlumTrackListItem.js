import moment from 'moment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import noImg from '../../assets/images/no-image.png'

const AlbumTrackListItem = ({ track, album }) => {
	const imageSrc = album.images.length ? album.images[album.images.length - 1]['url'] : noImg;

	return (
		<li className="track-list__item">
			<img className="track-list__image" src={imageSrc} alt="" />
			<div className="track-list__details">
				<h2>{track.name}</h2>
				<p>{track.artists.map((artist) => artist.name).join(', ')} &middot; {moment(track.duration_ms).format('mm:ss')}</p>
			</div>
			<PlayArrowIcon />
		</li>
	)
}

export default AlbumTrackListItem
