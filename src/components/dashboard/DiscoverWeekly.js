import { Link } from 'react-router-dom';
import noImage from 'assets/images/no-image.png';
import './DiscoverWeekly.scss';

const DiscoverWeekly = ({ playlist, user }) => {
	const imageSrc = playlist.image_url ? playlist.image_url : noImage;

	return playlist && (
		<section className="discover-weekly">
			<div className="discover-weekly__header">
				<Link to={`/playlist/${playlist.id}`}>
					<img src={imageSrc} alt="playlist cover" />
				</Link>
			</div>
			<div className="discover-weekly__body">
				<h3 className="sub-title">{playlist.type}</h3>
				<h2 className="title">
					<Link to={`/playlist/${playlist.id}`}>
						{playlist.name}
					</Link>
				</h2>
				<p>{playlist.description}</p>
			</div>
			<footer className="discover-weekly__footer">
				<p>Made for {user.display_name} by {playlist.owner} &middot; {playlist.total_tracks} tracks</p>
			</footer>
		</section>
	)
}

export default DiscoverWeekly;
