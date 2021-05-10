import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';

const PlaylistItem = ({ playlist }) => {
	const imgSrc = playlist.image_url ? playlist.image_url : noImage;

	return (
		<li className="list-item">
			<Link to={`/playlist/${playlist.id}`}>
				<img src={imgSrc} alt={playlist.name} loading="lazy" width="300" height="300" />
				<div className="list-item__body">
					<h2 className="list-item__body--title">{playlist.name}</h2>
					<p className="list-item__body--desc">by {playlist.owner_name} &middot; {playlist.tracks.total} tracks</p>
				</div>
				<button className="list-item__btn" aria-label="Go to playlist" title="Go to playlist" tabIndex="-1">
					<ChevronRightIcon />
				</button>
			</Link>
		</li>
	)
}

export default PlaylistItem;
