import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const PlaylistCard = ({ playlist }) => {
	const imgSrg = playlist.image_url ? playlist.image_url : noImage;

	return (
		<li className="card card-playlist">
			<Link to={`/playlist/${playlist.id}`} className="card__inner" aria-label={playlist.name}>
				<figure className="card__image">
					<img src={imgSrg} alt={playlist.name} loading="lazy" width="300" height="300" />
					<PlayButton uri={playlist.player_uri} type="playlist" />
				</figure>
			</Link>
		</li>
	)
}

export default PlaylistCard;
