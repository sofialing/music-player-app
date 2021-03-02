import { Link } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import usePlayer from 'hooks/usePlayer';
import noImage from 'assets/images/no-image.png';
import './card.scss';

const PlaylistCard = ({ playlist }) => {
	const { playContext } = usePlayer();
	const imageSrc = playlist.image_url ? playlist.image_url : noImage;

	const onPlayContext = e => {
		e.preventDefault();
		playContext(playlist.player_uri);
	}

	return (
		<Link to={`/playlist/${playlist.id}`} aria-label={`Go to ${playlist.name}`} >
			<li className="card card__playlist">
				<header className="card__header">
					<img className="card__header--img" src={imageSrc} alt={playlist.name} />
					<button className="play-btn" title="Play album" aria-label="Play album" onClick={onPlayContext}>
						<PlayArrowIcon style={{ fontSize: 32 }} />
					</button>
				</header>
			</li>
		</Link>
	)
}

export default PlaylistCard;
