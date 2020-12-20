import React from 'react'
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImg from '../../assets/images/no-image.png'

const TrackListItem = ({ track }) => {
	const image = track.album.images.length ? track.album.images[track.album.images.length - 1]['url'] : noImg;
	return (
		<Link to={`/track/${track.id}`}>
			<li className="list-item">
				<img className="list-item__image" src={image} alt="" />
				<div className="list-item__details">
					<h2>{track.name}</h2>
					<p>{track.artists.map((artist) => artist.name).join(', ')} &middot; {track.album.name}</p>
				</div>
				<ChevronRightIcon />
			</li>
		</Link>
	)
}

export default TrackListItem
