import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const PlaylistItem = ({ playlist }) => {
	return (
		<Link to={`/playlist/${playlist.id}`}>
			<li className="playlist__item">
				<img className="playlist__image" src={playlist.images[0]['url']} alt="" />
				<div className="playlist__details">
					<h2>{playlist.name}</h2>
					<p>by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks</p>
				</div>
				<ChevronRightIcon />
			</li>
		</Link>
	)
}

export default PlaylistItem
