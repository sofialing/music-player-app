import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';

const ArtistListItem = ({ artist }) => {
	const imgSrc = artist.image_url ? artist.image_url : noImage;

	return (
		<li className="list-item list-item-artist">
			<Link to={`/artist/${artist.id}`}>
				<img src={imgSrc} alt={artist.name} loading="lazy" width="300" height="300" />
				<div className="list-item__body">
					<h2 className="list-item__body--title">{artist.name}</h2>
					<p className="list-item__body--desc">{artist.followers} fans</p>
				</div>
				<button className="list-item__btn" aria-label="Go to artist" title="Go to artist" tabIndex="-1">
					<ChevronRightIcon />
				</button>
			</Link>
		</li>
	)
}

export default ArtistListItem;
