import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import './AlbumCard.scss';

const AlbumCard = ({ album }) => {
	const imageSrc = album.image_url ? album.image_url : noImage;
	return (
		<Link to={`/album/${album.id}`}>
			<li className="album-card">
				<header className="header">
					<img className="cover-img" src={imageSrc} alt="album cover" />
				</header>
				<div className="body">
					<h3 className="title">{album.name}</h3>
					<p className="details">{album.release_date} &middot; {album.type}</p>
				</div>
			</li>
		</Link>
	)
}

export default AlbumCard;
