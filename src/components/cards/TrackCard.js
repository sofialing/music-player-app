import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const TrackCard = ({ track }) => {
	const imgSrc = track.image_url ? track.image_url : noImage;

	return (
		<li className="card">
			<header className="card__header">
				<img src={imgSrc} alt={track.album_name} />
				<PlayButton uri={track.player_uri} type="track" />
			</header>
			<div className="card__body">
				<h3 className="card__body--title">{track.name}</h3>
				<p className="card__body--desc">{track.artists}</p>
			</div>
		</li>
	)
}

export default TrackCard;
