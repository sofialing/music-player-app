import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TrackListItem from 'components/partials/track/TrackListItem';
import './TopTracks.scss';

const TopTracks = ({ tracks }) => {
	return tracks && (
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
				{tracks.items.slice(0, 5).map(track =>
					<TrackListItem track={track} album={track.album} key={track.id} />
				)}
			</ul>
		</section>
	)
}

export default TopTracks;
