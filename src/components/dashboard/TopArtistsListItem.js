import { Link } from 'react-router-dom'

const TopArtistsListItem = ({ artist }) => {
	return (
		<Link to={`/artists/${artist.id}`}>
			<li className="top-artists-list__item">
				<div>
					<img src={artist.images[0]['url']} alt="" />
				</div>
				<h3>{artist.name}</h3>
				<p>{artist.followers.total} fans</p>
			</li>
		</Link>
	)
}

export default TopArtistsListItem
