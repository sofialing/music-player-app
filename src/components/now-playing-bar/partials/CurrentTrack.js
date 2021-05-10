import _ from 'lodash';
import noImage from 'assets/images/no-image.png';

const CurrentTrack = ({ track }) => {
	const imgSrc = _.isEmpty(track.album.images) ? noImage : track.album.images[0]['url'];

	return (
		<div className="currently-playing">
			<img src={imgSrc} alt={track.album.name} className="currently-playing__cover" loading="lazy" width="300" height="300" />
			<div className="currently-playing__details">
				<div className="currently-playing__details--track">{track.name}</div>
				<div className="currently-playing__details--artist">{track.artists.map(artist => artist.name).join(', ')}</div>
			</div>
		</div>
	)
}

export default CurrentTrack;
