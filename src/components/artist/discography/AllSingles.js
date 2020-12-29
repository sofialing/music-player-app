import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import AlbumListItem from '../../elements/AlbumListItem'

const AllSingles = ({ artistId }) => {
	const { spotify } = useAuth();
	const [singles, setSingles] = useState(null);

	useEffect(() => {
		spotify.getArtistAlbums(artistId, { limit: 50, country: 'from_token', include_groups: 'single' })
			.then((data) => {
				if (data.total) {
					setSingles(data.items)
				}
			})
			.catch(error => console.log(error));
	}, [artistId, spotify])


	return singles && (
		<section>
			<h2>Singles</h2>
			<ul>
				{singles.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
			</ul>
		</section>
	)
}

export default AllSingles
