import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import './card.scss';

const ArtistCard = ({ artist }) => {
	const imageSrc = artist.image_url ? artist.image_url : noImage;

	return (
		<Link to={`/artist/${artist.id}`} state={{ artist }} >
			<li className="card card__artist">
				<header className="card__header">
					<img className="card__header--img" src={imageSrc} alt={artist.name} />
				</header>
				<div className="card__body">
					<h3 className="card__body--title">{artist.name}</h3>
					<p className="card__body--details">{artist.followers} fans</p>
				</div>
			</li>
		</Link>
	)
}

export default ArtistCard;
