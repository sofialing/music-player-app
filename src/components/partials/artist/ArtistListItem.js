import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';
import './ArtistListItem.scss';

const ArtistListItem = ({ artist }) => {
	const imageSrc = artist.image_url ? artist.image_url : noImage;

	return (
		<Link to={`/artist/${artist.id}`}>
			<li className="artist-list-item">
				<img className="artist-list-item__image" src={imageSrc} alt="" />
				<div className="artist-list-item__details">
					<h2>{artist.name}</h2>
					<p>{artist.followers} fans</p>
				</div>
				<button aria-label="Go to artist" title="Go to artist">
					<ChevronRightIcon />
				</button>
			</li>
		</Link>
	)
}

export default ArtistListItem;
