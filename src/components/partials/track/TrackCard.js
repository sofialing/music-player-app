import noImage from 'assets/images/no-image.png';
import { getArtists } from 'utils';
import './TrackCard.scss';

const TrackCard = ({ track, album }) => {
	const imageSrc = album.images.length ? album.images[0]['url'] : noImage;
	return (
		<li className="track-card">
			<header className="header">
				<img className="cover-img" src={imageSrc} alt={album.name} />
			</header>
			<div className="body">
				<h3 className="title">{track.name}</h3>
				<p className="details">{getArtists(track.artists)}</p>
			</div>
		</li>
	)
}

export default TrackCard;
