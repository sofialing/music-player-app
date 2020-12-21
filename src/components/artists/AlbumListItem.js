import React from 'react'
import { Link } from 'react-router-dom'

const AlbumListItem = ({ album }) => {
	return (
		<Link to={`/albums/${album.id}`}>
			<li className="discography-list__item">
				<img src={album.images[0]['url']} alt="" />
				<h3>{album.name}</h3>
				<p>{album.release_date.split('-')[0]} &middot; {album.album_type} </p>
			</li>
		</Link>
	)
}

export default AlbumListItem
