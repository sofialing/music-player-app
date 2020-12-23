import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import noImage from '../../assets/images/no-image.png'

const ArtistListItem = ({ artist }) => {
	const imageSrc = artist.images.length ? artist.images[artist.images.length - 1]['url'] : noImage;

	return (
		<Link to={`/artist/${artist.id}`}>
			<li className="artist-list-item">
				<img className="artist-list-item__image" src={imageSrc} alt="" />
				<div className="artist-list-item__details">
					<h2>{artist.name}</h2>
					<p>{parseInt(artist.followers.total).toLocaleString()} followers</p>
				</div>
				<ChevronRightIcon />
			</li>
		</Link>
	)
}

export default ArtistListItem
