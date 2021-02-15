import noImage from 'assets/images/no-image.png';
import './TrackCard.scss';

const TrackCard = ({ track, album }) => {
	const imageSrc = track.image_url ? track.image_url : noImage;
	return (
		<li className="track-card">
			<header className="header">
				<img className="cover-img" src={imageSrc} alt={album.name} />
			</header>
			<div className="body">
				<h3 className="title">{track.name}</h3>
				<p className="details">{track.artists}</p>
			</div>
		</li>
	)
}

export default TrackCard;
