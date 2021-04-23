import { formatTime } from 'utils';

const PlaybackBar = ({ currentState: { position, progress }, duration }) => {
	return (
		<div className="playback-bar">
			<div className="playback-bar__current">
				{formatTime(position)}
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
