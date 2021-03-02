import { Link } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import usePlayer from 'hooks/usePlayer';
import noImage from 'assets/images/no-image.png';
import './card.scss';

const AlbumCard = ({ album }) => {
	const { playContext } = usePlayer();
	const imageSrc = album.image_url ? album.image_url : noImage;

	const onPlayContext = e => {
		e.preventDefault();
		playContext(album.player_uri);
	}

	return (
		<Link to={`/album/${album.id}`}>
			<li className="card card__album">
				<header className="card__header">
					<img className="card__header--img" src={imageSrc} alt={album.name} />
					<button className="play-btn" title="Play album" aria-label="Play album" onClick={onPlayContext}>
						<PlayArrowIcon style={{ fontSize: 32 }} />
					</button>
				</header>
				<div className="card__body">
					<h3 className="card__body--title">{album.name}</h3>
					<p className="card__body--details">{album.release_date} &middot; {album.type}</p>
				</div>
			</li>
		</Link>
	)
}

export default AlbumCard;
