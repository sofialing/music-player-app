import { useEffect, useState } from 'react';
import { usePlayback } from 'contexts/PlaybackContext';
import useViewport from 'hooks/useViewport'
import NowPlayingBarMobile from './NowPlayingBarMobile';
import NowPlayingBarDesktop from './NowPlayingBarDesktop';
import ExpandedPlayer from './partials/ExpandedPlayer';

const NowPlayingBar = () => {
	const { breakpoint_md, width } = useViewport();
	const { playback_state: { current_track, is_playing }, player } = usePlayback();
	const [currentState, setCurrentState] = useState({ position: 0, progress: 0 });
	const [prevTrack, setPrevTrack] = useState(null);

	useEffect(() => {
		let interval;
		if (is_playing) {
			interval = setInterval(() => {
				player.getCurrentState().then((state) => {
					setCurrentState({
						position: state.position,
						progress: Math.min(1, state.position / current_track.duration_ms),
					})
				})
			}, 1000);
		}
		else {
			clearInterval(interval)
		}

		return () => clearInterval(interval);
	}, [current_track, is_playing, player])

	useEffect(() => {
		// check if current track is same as stored track
		if (!current_track || current_track?.id === prevTrack) {
			return;
		}
		// store current track
		setPrevTrack(current_track?.id);
		//reset current position and progress if track changes
		setCurrentState({ position: 0, progress: 0 });
	}, [current_track, prevTrack])

	if (!current_track) {
		return null;
	}

	return (
		<>
			<ExpandedPlayer currentState={currentState} />
			{
				width < breakpoint_md
					? <NowPlayingBarMobile currentState={currentState} />
					: <NowPlayingBarDesktop currentState={currentState} />
			}
		</>
	)
}

export default NowPlayingBar;
