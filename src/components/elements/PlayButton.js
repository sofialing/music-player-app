import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import usePlayer from '../../hooks/usePlayer';

const PlayButton = ({ uri }) => {
	const { playContext } = usePlayer();

	return (
		<button className="play-btn" onClick={() => playContext(uri)}>
			<PlaylistPlayIcon />
			<span>Play</span>
		</button>
	)
}

export default PlayButton
