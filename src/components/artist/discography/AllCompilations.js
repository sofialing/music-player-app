import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import AlbumListItem from '../../elements/AlbumListItem'

const AllCompilations = ({ artistId }) => {
	const { spotify } = useAuth();
	const [compilations, setCompilations] = useState(null);

	useEffect(() => {
		spotify.getArtistAlbums(artistId, { limit: 50, country: 'from_token', include_groups: 'compilation' })
			.then((data) => {
				if (data.total) {
					setCompilations(data.items)
				}
			})
			.catch(error => console.log(error));
	}, [artistId, spotify])


	return compilations && (
		<section>
			<h2>Compilations</h2>
			<ul>
				{compilations.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
			</ul>
		</section>
	)
}

export default AllCompilations
