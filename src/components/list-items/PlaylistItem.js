import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import noImage from 'assets/images/no-image.png';

const PlaylistItem = ({ playlist }) => {
	const imgSrc = playlist.image_url ? playlist.image_url : noImage;

	return (
		<Link to={`/playlist/${playlist.id}`}>
			<li className="list-item">
				<img src={imgSrc} alt={playlist.name} />
				<div className="list-item__body">
					<h2 className="list-item__body--title">{playlist.name}</h2>
					<p className="list-item__body--desc">by {playlist.owner_name} &middot; {playlist.tracks.total} tracks</p>
				</div>
				<button className="list-item__btn" aria-label="Go to playlist" title="Go to playlist">
					<ChevronRightIcon />
				</button>
			</li>
		</Link>
	)
}

export default PlaylistItem;
