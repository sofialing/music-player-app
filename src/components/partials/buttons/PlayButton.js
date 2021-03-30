import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import usePlayer from 'hooks/usePlayer';

const PlayButton = ({ uri, type }) => {
	const { playContext } = usePlayer();

	return (
		<button className="play-btn" aria-label={`Play ${type}`} onClick={() => playContext(uri)}>
			<PlayArrowIcon style={{ fontSize: 32 }} />
		</button>
	)
}

export default PlayButton;
