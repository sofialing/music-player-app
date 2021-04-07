import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const PlaylistCard = ({ playlist }) => {
	const imgSrg = playlist.image_url ? playlist.image_url : noImage;

	return (
		<Link to={`/playlist/${playlist.id}`} aria-label={`Go to ${playlist.name}`} >
			<li className="card card-playlist">
				<header className="card__header">
					<img src={imgSrg} alt={playlist.name} />
					<PlayButton uri={playlist.player_uri} type="playlist" />
				</header>
			</li>
		</Link>
	)
}

export default PlaylistCard;
