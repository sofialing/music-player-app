import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import PlaylistCard from 'components/partials/cards/PlaylistCard';
import './Playlists.scss';

const Playlists = ({ playlists }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return playlists && (
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
				{playlists.items.slice(0, items).map(playlist => <PlaylistCard playlist={playlist} key={playlist.id} />)}
			</ul>
		</section>
	)
}

export default Playlists;
