import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TrackListItem from 'components/partials/track/TrackListItem';
import './Recommendations.scss';

const Recommendations = ({ recommendations }) => {
	return recommendations && (
		<section className="recommendations">
			<header className="header">
				<h2 className="title">
					<Link to='recommended-tracks' state={{ recommendations }}>Recommended for you</Link>
				</h2>
				<Link className="view-all" to='recommended-tracks' state={{ recommendations }}>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="list">
				{recommendations.slice(0, 5).map(track => <TrackListItem track={track} album={track.album} key={track.id} />)}
			</ul>
		</section>
	)
}

export default Recommendations;
