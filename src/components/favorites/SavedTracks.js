import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import TrackCard from 'components/partials/cards/TrackCard';
import './SavedTracks.scss';

const SavedTracks = ({ tracks }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return tracks && (
		<section className="saved-tracks">
			<header className="header">
				<h2 className="title">
					<Link to='tracks'>Your saved tracks</Link>
				</h2>
				<Link className="view-all" to='tracks'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{tracks.items.slice(0, items).map(track =>
					<TrackCard track={track} album={track.album} key={track.id} />
				)}
			</ul>
		</section>
	)
}

export default SavedTracks;
