import { useState, useEffect } from 'react';
import FastAverageColor from 'fast-average-color';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { usePlayback } from 'contexts/PlaybackContext';
import PlayerControls from './PlayerControls';
import PlaybackBar from './PlaybackBar';
import CurrentTrack from './CurrentTrack';

const fac = new FastAverageColor();

const ExpandedPlayer = ({ currentPosition, progress }) => {
	const { display_player, current_track, is_playing, context, dispatch } = usePlayback();
	const [style, setStyle] = useState(null);

	useEffect(() => {
		fac.getColorAsync(current_track.album.images[0].url)
			.then(color => setStyle({ backgroundColor: color.rgb }))
			.catch(e => console.log(e));
		return () => fac.destroy();
	}, [current_track])


	const closePlayer = () => {
		dispatch({ type: 'SET_DISPLAY_PLAYER', display_player: false })
	}

	return current_track && (
		<aside className="expanded-player" aria-hidden={!display_player} style={style}>
			<header className="expanded-player__header">
				<ExpandMoreIcon onClick={closePlayer} />
				<small>Now playing</small>
				<p>{context && context.uri ? context.metadata.context_description : current_track.album.name}</p>
			</header>
			<CurrentTrack track={current_track} />
			<PlayerControls is_playing={is_playing} />
			<PlaybackBar currentPosition={currentPosition} progress={progress} duration={current_track.duration_ms} />
		</aside>
	)
}

export default ExpandedPlayer;
