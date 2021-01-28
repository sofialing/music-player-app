import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import PlaylistItem from 'components/partials/playlist/PlaylistItem';
import './Playlists.scss';

const Playlists = () => {
	const { user_playlists } = useAuth();

	return (
		<section className="playlists">
			<header className="header">
				<h2 className="title">
					<Link to='playlists'>Playlists</Link>
				</h2>
				<Link className="view-all" to='playlists'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="list">
				{user_playlists && user_playlists.items.slice(0, 5).map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default Playlists;
