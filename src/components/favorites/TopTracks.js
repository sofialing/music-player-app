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
				<h2 className="title">
					<Link to='top-tracks'>Your top tracks</Link>
				</h2>
				<Link className="view-all" to='top-tracks'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="list">
				{top_tracks && top_tracks.items.slice(0, 5).map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default TopTracks
