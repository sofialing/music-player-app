import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import useViewport from 'hooks/useViewport';
import PlaylistCard from 'components/partials/playlist/PlaylistCard';
import './Playlists.scss';

const Playlists = () => {
	const { user_playlists } = useAuth();
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

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
			<ul className="grid">
				{user_playlists && user_playlists.items.slice(0, items).map((playlist, index) => <PlaylistCard playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default Playlists;
