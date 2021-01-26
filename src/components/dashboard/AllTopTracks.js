import { useAuth } from '../../contexts/AuthContext';
import TrackListItem from '../partials/TrackListItem';
import PageHeader from '../partials/PageHeader';
import './AllTopTracks.scss';

const AllTopTracks = () => {
	const { top_tracks } = useAuth();

	return (
		<main className="main-view top-tracks-view">
			<PageHeader title='Top Tracks' />
			<section className="tracks">
				<ul className="list">
					{top_tracks && top_tracks.items.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllTopTracks;
