import noImage from 'assets/images/no-image.png';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import usePlayer from 'hooks/usePlayer';
import './card.scss';

const TrackCard = ({ track, album }) => {
	const { playTrack } = usePlayer();

	const imageSrc = track.image_url ? track.image_url : noImage;
	return (
		<li className="card card__track">
			<header className="card__header">
				<img className="card__header--img" src={imageSrc} alt={album.name} />
				<button className="play-btn" title="Play track" aria-label="Play track" onClick={() => playTrack(track.player_uri)}>
					<PlayArrowIcon style={{ fontSize: 32 }} />
				</button>
			</header>
			<div className="card__body">
				<h3 className="card__body--title">{track.name}</h3>
				<p className="card__body--details">{track.artists}</p>
			</div>
		</li>
	)
}

export default TrackCard;
