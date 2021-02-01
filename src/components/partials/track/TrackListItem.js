import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import noImage from 'assets/images/no-image.png';
import { usePlayback } from 'contexts/PlaybackContext';
import usePlayer from 'hooks/usePlayer';

import { formatTime, getArtists } from 'utils';
import './TrackListItem.scss';

const TrackListItem = ({ track, album, displayAlbumTitle = true }) => {
	const imageSrc = album.images.length ? album.images[0]['url'] : noImage;
	const { current_track, is_playing } = usePlayback();
	const { pauseTrack, playTrack } = usePlayer();

	return (
		<li className="track-list-item" onDoubleClick={() => playTrack(track.uri)}>
			<img className="track-list-item__image" src={imageSrc} alt={`album cover for "${album.name}"`} />
			<div className="track-list-item__details">
				<h2>{track.name}</h2>
				<p>
					{getArtists(track.artists)} &middot; {' '}
					{displayAlbumTitle ? album.name : formatTime(track.duration_ms)}
				</p>
			</div>
			{current_track && is_playing && current_track.id === track.id ?
				<button aria-label="Pause" title="Pause" type="button" onClick={() => pauseTrack(track.uri)}>
					<PauseCircleOutlineIcon />
				</button> :
				<button aria-label="Play" title="Play" type="button" onClick={() => playTrack(track.uri)}>
					<PlayCircleOutlineIcon />
				</button>
			}
		</li>
	)
}

export default TrackListItem;
