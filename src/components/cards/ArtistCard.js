import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const ArtistCard = ({ artist }) => {
	const imgSrc = artist.image_url ? artist.image_url : noImage;

	return (
		<li className="card card-artist">
			<Link to={`/artist/${artist.id}`} className="card__inner" aria-label={artist.name} state={{ artist }} >
				<figure className="card__image">
					<div>
						<img src={imgSrc} alt={artist.name} loading="lazy" width="300" height="300" />
					</div>
					<PlayButton uri={artist.player_uri} type={artist.type} />
				</figure>
				<div className="card__body">
					<h3 className="card__body--title">{artist.name}</h3>
					<p className="card__body--desc">{artist.followers} fans</p>
				</div>
			</Link>
		</li>
	)
}

export default ArtistCard;
