import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';

const AlbumListItem = ({ album, displayArtist = true }) => {
	const imgSrc = album.image_url ? album.image_url : noImage;

	return (
		<li className="list-item">
			<Link to={`/album/${album.id}`}>
				<img src={imgSrc} alt="album cover" />
				<div className="list-item__body">
					<h2 className="list-item__body--title">{album.name}</h2>
					<p className="list-item__body--desc">
						{displayArtist ? album.artists : album.total_tracks + ' tracks'}
						{' '} &middot; {album.release_date}
					</p>
				</div>
				<button className="list-item__btn" aria-label="Go to album" title="Go to album" tabindex="-1">
					<ChevronRightIcon />
				</button>
			</Link>
		</li>
	)
}

export default AlbumListItem;
