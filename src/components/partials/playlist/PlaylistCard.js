import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import './PlaylistCard.scss';

const PlaylistCard = ({ playlist }) => {
	const imageSrc = playlist.image_url ? playlist.image_url : noImage;
	return (
		<Link to={`/playlist/${playlist.id}`} aria-label={`Go to ${playlist.name}`} >
			<li className="playlist-card">
				<header className="playlist-card__image">
					<img src={imageSrc} alt="playlist cover" />
				</header>
			</li>
		</Link>
	)
}

export default PlaylistCard;
