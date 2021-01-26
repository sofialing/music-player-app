import { useAuth } from 'contexts/AuthContext';
import TrackListItem from 'components/partials/TrackListItem';
import PageHeader from 'components/partials/PageHeader';
import './TopTracks.scss';

const TopTracks = () => {
	const { top_tracks } = useAuth();

	return (
		<main id="top-tracks" className="main-view">
			<PageHeader title='Top Tracks' />
			<section className="tracks">
				<ul className="list">
					{top_tracks && top_tracks.items.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default TopTracks;
