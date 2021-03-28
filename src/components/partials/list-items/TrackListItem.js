import noImage from 'assets/images/no-image.png';
import usePlayer from 'hooks/usePlayer';
import ToggleButton from 'components/partials/buttons/ToggleButton';

const TrackListItem = ({ track, displayAlbumTitle = true }) => {
	const imgSrc = track.image_url ? track.image_url : noImage;
	const { playTrack } = usePlayer();

	return (
		<li className="list-item" onDoubleClick={() => playTrack(track.player_uri)}>
			<img src={imgSrc} alt="album cover" />
			<div className="list-item__body">
				<h2 className="list-item__body--title">{track.name}</h2>
				<p className="list-item__desc">{track.artists} &middot; {displayAlbumTitle ? track.album_name : track.duration}</p>
			</div>
			<ToggleButton track={track} />
		</li>
	)
}

export default TrackListItem;
