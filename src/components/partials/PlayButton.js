import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import usePlayer from 'hooks/usePlayer';
import './PlayButton.scss';

const PlayButton = ({ uri }) => {
	const { playContext } = usePlayer();

	return (
		<button className="play-button" onClick={() => playContext(uri)}>
			<PlaylistPlayIcon />
			<span>Play</span>
		</button>
	)
}

export default PlayButton;
