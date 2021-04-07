import { useEffect, useState } from 'react';
import { usePlayback } from 'contexts/PlaybackContext';
import useViewport from 'hooks/useViewport'
import NowPlayingBarMobile from './NowPlayingBarMobile';
import NowPlayingBarDesktop from './NowPlayingBarDesktop';
import ExpandedPlayer from './partials/ExpandedPlayer';

const NowPlayingBar = () => {
	const { breakpoint_md, width } = useViewport();
	const { current_track, is_playing, player } = usePlayback();
	const [currentPosition, setCurrentPosition] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let interval;
		if (is_playing) {
			interval = setInterval(() => {
				player.getCurrentState().then(({ position }) => {
					setCurrentPosition(position);
					setProgress(Math.min(1, position / current_track.duration_ms));
				})
			}, 1000);
		}
		else {
			clearInterval(interval)
		}

		return () => clearInterval(interval);
	}, [current_track, is_playing, player])

	if (!current_track) {
		return null;
	}

	return (
		<>
			<ExpandedPlayer currentPosition={currentPosition} progress={progress} />
			{
				width < breakpoint_md
					? <NowPlayingBarMobile currentPosition={currentPosition} progress={progress} />
					: <NowPlayingBarDesktop currentPosition={currentPosition} progress={progress} />
			}
		</>
	)
}

export default NowPlayingBar;
