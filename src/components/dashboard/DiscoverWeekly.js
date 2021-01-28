import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import './DiscoverWeekly.scss';

const DiscoverWeekly = () => {
	const { discover_weekly, user } = useAuth();

	return (
		<section className="discover-weekly">
			<div className="discover-weekly__header">
				<Link to={`/playlist/${discover_weekly.id}`}>
					<img src={discover_weekly.images[0].url} alt="playlist cover" />
				</Link>
			</div>
			<div className="discover-weekly__body">
				<h3 className="sub-title">{discover_weekly.type}</h3>
				<h2 className="title">
					<Link to={`/playlist/${discover_weekly.id}`}>
						{discover_weekly.name}
					</Link>
				</h2>
				<p>{discover_weekly.description}</p>
			</div>
			<footer className="discover-weekly__footer">
				<p>Made for {user.display_name} by {discover_weekly.owner.display_name} &middot; {discover_weekly.tracks.total} tracks</p>
			</footer>
		</section >
	)
}

export default DiscoverWeekly;
