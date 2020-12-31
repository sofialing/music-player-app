import { Link } from 'react-router-dom'
import { formatNumber } from '../../utils'
import noImage from '../../assets/images/no-image.png'

const ArtistCard = ({ artist }) => {
	const imageSrc = artist.images.length ? artist.images[artist.images.length - 1]['url'] : noImage;

	return (
		<Link to={`/artist/${artist.id}`} state={{ artist }} >
			<li className="artist-card">
				<header className="artist-card__header">
					<img src={imageSrc} alt={artist.name} />
				</header>
				<div className="artist-card__body">
					<h3>{artist.name}</h3>
					<p>{formatNumber(artist.followers.total)} fans</p>
				</div>
			</li>
		</Link>
	)
}

export default ArtistCard
