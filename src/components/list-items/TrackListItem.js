import { useLocation } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import usePlayerControls from 'hooks/usePlayerControls';
import ToggleButton from 'components/buttons/ToggleButton';

const TrackListItem = ({ track }) => {
	const { playTrack } = usePlayerControls();
	const { pathname } = useLocation();
	const imgSrc = track.image_url ? track.image_url : noImage;

	return (
		<li className="list-item track" onDoubleClick={() => playTrack(track.player_uri)}>
			<img src={imgSrc} alt="album cover" loading="lazy" width="300" height="300" />
			<div className="list-item__body">
				<h2 className="list-item__body--title">{track.name}</h2>
				<p className="list-item__body--desc">{track.artists} &middot; {
					pathname.includes('/album/') || track.type === "episode"
						? track.duration
						: track.album_name
				}</p>
			</div>
			<ToggleButton track={track} />
		</li>
	)
}

export default TrackListItem;
