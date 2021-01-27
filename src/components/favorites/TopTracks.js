import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import TrackListItem from 'components/partials/track/TrackListItem';
import './TopTracks.scss';

const TopTracks = () => {
	const { top_tracks } = useAuth();

	return (
		<section className="top-tracks">
			<header className="header">
				<Link to='top-tracks'>
					<h2 className="title">Top Tracks</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="list">
				{top_tracks && top_tracks.items.slice(0, 5).map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default TopTracks
