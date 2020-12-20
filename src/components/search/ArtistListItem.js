import React from 'react'
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImg from '../../assets/images/no-image.png'

const ArtistListItem = ({ artist }) => {
	const image = artist.images.length ? artist.images[artist.images.length - 1]['url'] : noImg;
	return (
		<Link to={`/artist/${artist.id}`}>
			<li className="list-item">
				<img className="list-item__image" src={image} alt="" />
				<div className="list-item__details">
					<h2>{artist.name}</h2>
					<p>{artist.followers.total} fans</p>
				</div>
				<ChevronRightIcon />
			</li>
		</Link>
	)
}

export default ArtistListItem
