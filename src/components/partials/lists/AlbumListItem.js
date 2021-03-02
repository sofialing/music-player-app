import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';
import './AlbumListItem.scss';

const AlbumListItem = ({ album, displayArtist = true }) => {
	const imageSrc = album.image_url ? album.image_url : noImage;
	return (
		<Link to={`/album/${album.id}`}>
			<li className="album-list-item">
				<img className="album-list-item__image" src={imageSrc} alt="album cover" />
				<div className="album-list-item__details">
					<h2>{album.name}</h2>
					<p>
						{displayArtist ? album.artists : album.total_tracks + ' tracks'}
						{' '} &middot; {album.release_date}
					</p>
				</div>
				<button aria-label="Go to album" title="Go to album">
					<ChevronRightIcon />
				</button>
			</li>
		</Link>
	)
}

export default AlbumListItem;
