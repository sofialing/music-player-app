import { useEffect, useState } from 'react'
import { usePlayback } from '../../contexts/PlaybackContext';

const ProgressBar = () => {
	const [progress, setProgress] = useState(0);
	const { current_track, is_playing, player } = usePlayback();

	useEffect(() => {
		let interval;
		if (is_playing) {
			interval = setInterval(() => {
				player.getCurrentState().then(({ position }) => {
					setProgress(Math.min(1, position / current_track.duration));
				})
			}, 1000);
		}
		else {
			clearInterval(interval)
		}

		return () => clearInterval(interval);
	}, [current_track, is_playing, player])

	return (
		<div className="progress-bar">
			<div className="progress-bar__wrapper">
				<div className="progress-bar__progress" style={{ transform: `translateX(-${100 - 100 * progress}%)` }}></div>
			</div>
		</div>
	)
}

export default ProgressBar
