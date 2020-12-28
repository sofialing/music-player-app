import { Link } from 'react-router-dom'
import noImage from '../../assets/images/no-image.png'

const PlaylistCard = ({ playlist }) => {
	const imageSrc = playlist.images.length ? playlist.images[playlist.images.length - 1]['url'] : noImage;
	return (
		<Link to={`/playlist/${playlist.id}`}>
			<li className="playlist-card">
				<header className="playlist-card__image">
					<img src={imageSrc} alt={playlist.name} />
				</header>
			</li>
		</Link>
	)
}

export default PlaylistCard
