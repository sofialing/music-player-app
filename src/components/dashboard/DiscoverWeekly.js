import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { usePlayer } from '../../contexts/PlayerContext';

const DiscoverWeekly = () => {
	const { discover_weekly, user } = usePlayer();

	return (
		<section className="discover-weekly">
			<header>
				<Link to={`/playlist/${discover_weekly.id}`}>
					<h2>{discover_weekly.name}</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<div className="card">
				<header className="card__header">
					<img src={discover_weekly.images[0].url} alt={discover_weekly.name} />
				</header>
				<div className="card__body">
					<p>{discover_weekly.description}</p>
				</div>
				<footer className="card__footer">
					<p>Created for {user.display_name} by {discover_weekly.owner.display_name} &middot; {discover_weekly.tracks.total} tracks</p>
				</footer>
			</div>
		</section>
	)
}

export default DiscoverWeekly
