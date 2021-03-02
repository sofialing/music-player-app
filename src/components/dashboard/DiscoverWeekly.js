import { Link } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import usePlayer from 'hooks/usePlayer';
import noImage from 'assets/images/no-image.png';
import './DiscoverWeekly.scss';

const DiscoverWeekly = ({ playlist, user }) => {
	const { playContext } = usePlayer();
	const imageSrc = playlist.image_url ? playlist.image_url : noImage;

	const onPlayContext = e => {
		e.preventDefault();
		playContext(playlist.player_uri);
	}

	return playlist && (
		<section className="discover-weekly">
			<header className="discover-weekly__header">
				<img className="discover-weekly__header--img" src={imageSrc} alt={playlist.name} />
				<button className="play-btn" title="Play album" aria-label="Play album" onClick={onPlayContext}>
					<PlayArrowIcon style={{ fontSize: 32 }} />
				</button>
			</header>
			<div className="discover-weekly__body">
				<h3 className="discover-weekly__body--subtitle">{playlist.type}</h3>
				<h2 className="discover-weekly__body--title">
					<Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
				</h2>
				<p className="discover-weekly__body--desc">{playlist.description}</p>
				<p className="discover-weekly__body--details">Made for {user.display_name} by {playlist.owner} &middot; {playlist.total_tracks} tracks</p>
			</div>
		</section>
	)
}

export default DiscoverWeekly;
