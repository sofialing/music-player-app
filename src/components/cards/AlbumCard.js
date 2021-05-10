import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const AlbumCard = ({ album }) => {
	const imgSrc = album.image_url ? album.image_url : noImage;

	return (
		<li className="card">
			<Link to={`/album/${album.id}`} className="card__inner" aria-label={album.name}>
				<figure className="card__image">
					<img src={imgSrc} alt={album.name} loading="lazy" width="640" height="640" />
					<PlayButton uri={album.player_uri} type={album.type} />
				</figure>
				<div className="card__body">
					<h3 className="card__body--title">{album.name}</h3>
					<p className="card__body--desc">{album.release_date} &middot; {album.type}</p>
				</div>
			</Link>
		</li>
	)
}

export default AlbumCard;
