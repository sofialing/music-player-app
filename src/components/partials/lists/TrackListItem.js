import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import noImage from 'assets/images/no-image.png';
import { usePlayback } from 'contexts/PlaybackContext';
import usePlayer from 'hooks/usePlayer';
import './TrackListItem.scss';

const TrackListItem = ({ track, album, displayAlbumTitle = true }) => {
	const imageSrc = album.image_url ? album.image_url : noImage;
	const { current_track, is_playing } = usePlayback();
	const { pauseTrack, playTrack } = usePlayer();

	return (
		<li className="track-list-item" onDoubleClick={() => playTrack(track.player_uri)}>
			<img className="track-list-item__image" src={imageSrc} alt="album cover" />
			<div className="track-list-item__details">
				<h2>{track.name}</h2>
				<p>{track.artists} &middot; {displayAlbumTitle ? album.name : track.duration}</p>
			</div>
			{current_track && is_playing && current_track.id === track.id ?
				<button aria-label="Pause" title="Pause" type="button" onClick={() => pauseTrack(track.player_uri)}>
					<PauseCircleOutlineIcon />
				</button> :
				<button aria-label="Play" title="Play" type="button" onClick={() => playTrack(track.player_uri)}>
					<PlayCircleOutlineIcon />
				</button>
			}
		</li>
	)
}

export default TrackListItem;
