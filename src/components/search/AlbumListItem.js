import React from 'react'
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImg from '../../assets/images/no-image.png'

const AlbumListItem = ({ album }) => {
	const image = album.images.length ? album.images[album.images.length - 1]['url'] : noImg;
	return (
		<Link to={`/album/${album.id}`}>
			<li className="list-item">
				<img className="list-item__image" src={image} alt="" />
				<div className="list-item__details">
					<h2>{album.name}</h2>
					<p>{album.artists.map((artist) => artist.name).join(', ')}</p>
				</div>
				<ChevronRightIcon />
			</li>
		</Link>
	)
}

export default AlbumListItem
