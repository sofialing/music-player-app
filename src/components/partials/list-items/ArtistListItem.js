import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';

const ArtistListItem = ({ artist }) => {
	const imgSrc = artist.image_url ? artist.image_url : noImage;

	return (
		<Link to={`/artist/${artist.id}`}>
			<li className="list-item list-item-artist">
				<img src={imgSrc} alt="" />
				<div className="list-item__body">
					<h2 className="list-item__body--title">{artist.name}</h2>
					<p className="list-item__body--desc">{artist.followers} fans</p>
				</div>
				<button className="list-item__btn" aria-label="Go to artist" title="Go to artist">
					<ChevronRightIcon />
				</button>
			</li>
		</Link>
	)
}

export default ArtistListItem;
