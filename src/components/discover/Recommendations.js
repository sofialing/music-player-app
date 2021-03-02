import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import TrackCard from 'components/partials/cards/TrackCard';
import './Recommendations.scss';

const Recommendations = ({ recommendations }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

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
			<ul className="grid">
				{recommendations.slice(0, items).map(track => <TrackCard track={track} album={track.album} key={track.id} />)}
			</ul>
		</section>
	)
}

export default Recommendations;
