import { Link } from 'react-router-dom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const PlaylistItem = ({ playlist }) => {
	return (
		<Link to={`/playlist/${playlist.id}`}>
			<li className="playlist__item">
				<img className="playlist__image" src={playlist.images[0]['url']} alt="" />
				<div className="playlist__details">
					<span>{playlist.name}</span>
					<span>by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks</span>
				</div>
				<ArrowRightIcon />
			</li>
		</Link>
	)
}

export default PlaylistItem
