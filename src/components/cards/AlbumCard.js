import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const AlbumCard = ({ album }) => {
	const imgSrc = album.image_url ? album.image_url : noImage;

	return (
		<Link to={`/album/${album.id}`}>
			<li className="card">
				<header className="card__header">
					<img src={imgSrc} alt={album.name} />
					<PlayButton uri={album.player_uri} type={album.type} />
				</header>
				<div className="card__body">
					<h3 className="card__body--title">{album.name}</h3>
					<p className="card__body--desc">{album.release_date} &middot; {album.type}</p>
				</div>
			</li>
		</Link>
	)
}

export default AlbumCard;
