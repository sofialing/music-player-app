import { formatTime } from 'utils';

const PlaybackBar = ({ currentPosition, progress, duration }) => {
	return (
		<div className="playback-bar">
			<div className="playback-bar__current">
				{formatTime(currentPosition)}
			</div>
			<div className="playback-bar__progress">
				<div className="playback-bar__progress--bar" style={{ transform: `translateX(-${100 - 100 * progress}%)` }}></div>
			</div>
			<div className="playback-bar__duration">
				{formatTime(duration)}
			</div>
		</div>
	)
}

export default PlaybackBar
