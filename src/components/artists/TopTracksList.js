import TrackListItem from '../elements/TrackListItem'

const TopTracksList = ({ topTracks }) => {
	return (
		<section className="top-tracks">
			<header>
				<h2>Top Tracks</h2>
			</header>
			<ul>
				{topTracks.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default TopTracksList
