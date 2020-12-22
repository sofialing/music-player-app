import React from 'react'
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from '../../assets/images/no-image.png'

const AlbumListItem = ({ album, displayArtist = true }) => {
	const imageSrc = album.images.length ? album.images[album.images.length - 1]['url'] : noImage;
	return (
		<Link to={`/album/${album.id}`}>
			<li className="album-list-item">
				<img className="album-list-item__image" src={imageSrc} alt="" />
				<div className="album-list-item__details">
					<h2>{album.name}</h2>
					<p>
						{displayArtist ? (
							album.artists.map((artist) => artist.name).join(', ')
						) : album.total_tracks > 2 ? `${album.total_tracks} tracks` : `${album.total_tracks} track`}
						{' '} &middot; {album.release_date.split('-')[0]}
					</p>
				</div>
				<ChevronRightIcon />
			</li>
		</Link>
	)
}

export default AlbumListItem
