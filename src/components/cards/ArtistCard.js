import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const ArtistCard = ({ artist }) => {
	const imgSrc = artist.image_url ? artist.image_url : noImage;

	return (
		<Link to={`/artist/${artist.id}`} state={{ artist }} >
			<li className="card card-artist">
				<header className="card__header">
					<figure>
						<img src={imgSrc} alt={artist.name} />
					</figure>
					<PlayButton uri={artist.player_uri} type={artist.type} />
				</header>
				<div className="card__body">
					<h3 className="card__body--title">{artist.name}</h3>
					<p className="card__body--desc">{artist.followers} fans</p>
				</div>
			</li>
		</Link>
	)
}

export default ArtistCard;
