import TrackListItem from '../playlist/TrackListItem';

const TopTracks = ({ tracks }) => {
	return (
		<section className="top-tracks">
			<header>
				<h2>Top Tracks</h2>
			</header>
			<ul className="track-list">
				{tracks.map((track, index) => <TrackListItem track={track} key={index} />)}
			</ul>
		</section>
	)
}

export default TopTracks
