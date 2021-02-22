import { useAuth } from 'contexts/AuthContext';
import TrackListItem from 'components/partials/track/TrackListItem';
import PageHeader from 'components/layout/PageHeader';
import './TopTracks.scss';

const TopTracks = () => {
	const { top_tracks } = useAuth();

	return (
		<main id="top-tracks" className="main-view">
			<PageHeader title='Your top tracks' />
			<section className="tracks">
				<ul className="list">
					{top_tracks && top_tracks.items.map(track => <TrackListItem track={track} album={track.album} key={track.id} />)}
				</ul>
			</section>
		</main>
	)
}

export default TopTracks;
