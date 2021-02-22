import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import './ArtistCard.scss';

const ArtistCard = ({ artist }) => {
	const imageSrc = artist.image_url ? artist.image_url : noImage;

	return (
		<Link to={`/artist/${artist.id}`} state={{ artist }} >
			<li className="artist-card">
				<header className="header">
					<img className="cover-img" src={imageSrc} alt={artist.name} />
				</header>
				<div className="body">
					<h3 className="title">{artist.name}</h3>
					<p className="details">{artist.followers} fans</p>
				</div>
			</li>
		</Link>
	)
}

export default ArtistCard;
