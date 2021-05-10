import noImage from 'assets/images/no-image.png';
import PlayButton from 'components/buttons/PlayButton';

const TrackCard = ({ track }) => {
	const imgSrc = track.image_url ? track.image_url : noImage;

	return (
		<li className="card">
			<div className="card__inner">
				<figure className="card__image">
					<img src={imgSrc} alt={track.album_name} loading="lazy" width="640" height="640" />
					<PlayButton uri={track.player_uri} type="track" />
				</figure>
				<div className="card__body">
					<h3 className="card__body--title">{track.name}</h3>
					<p className="card__body--desc">{track.artists}</p>
				</div>
			</div>
		</li>
	)
}

export default TrackCard;
