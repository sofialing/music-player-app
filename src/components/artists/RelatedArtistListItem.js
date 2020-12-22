import { Link } from 'react-router-dom'

const RelatedArtistListItem = ({ artist }) => {
	return (
		<Link to={`/artists/${artist.id}`}>
			<li className="related-artists-list__item">
				<img src={artist.images[0]['url']} alt="" />
				<h3>{artist.name}</h3>
			</li>
		</Link>
	)
}

export default RelatedArtistListItem
