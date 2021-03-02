import TrackListItem from 'components/partials/lists/TrackListItem';

const ArtistTopTracks = ({ topTracks }) => {
	return topTracks && (
		<section className="top-tracks">
			<header className="header">
				<h2 className="title">Top Tracks</h2>
			</header>
			<ul className="list">
				{topTracks.slice(0, 5).map(track => <TrackListItem track={track} album={track.album} key={track.id} />)}
			</ul>
		</section>
	)
}

export default ArtistTopTracks;
