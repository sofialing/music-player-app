import TrackListItem from '../playlist/TrackListItem';

const TopTracksList = ({ topTracks }) => {
	return (
		<section className="top-topTracks">
			<header>
				<h2>Top Tracks</h2>
			</header>
			<ul className="track-list">
				{topTracks.map((track, index) => <TrackListItem track={track} key={index} />)}
			</ul>
		</section>
	)
}

export default TopTracksList
