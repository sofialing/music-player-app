import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import { getYear } from 'utils';
import './AlbumCard.scss';

const AlbumCard = ({ album }) => {
	const imageSrc = album.images.length ? album.images[0]['url'] : noImage;
	return (
		<Link to={`/album/${album.id}`}>
			<li className="album-card">
				<header className="header">
					<img className="cover-img" src={imageSrc} alt={album.name} />
				</header>
				<div className="body">
					<h3 className="title">{album.name}</h3>
					<p className="details">{getYear(album.release_date)} &middot; {album.album_type}</p>
				</div>
			</li>
		</Link>
	)
}

export default AlbumCard;
