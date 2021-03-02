import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import PlaylistCard from 'components/partials/cards/PlaylistCard';
import './FeaturedPlaylists.scss';

const FeaturedPlaylists = ({ playlists, title }) => {
	const { breakpoint_lg, width } = useViewport();
	const num = width <= breakpoint_lg ? 4 : 6;

	return playlists && (
		<section className="featured-playlists">
			<header className="header">
				<h2 className="title">
					<Link to='featured-playlists' state={{ title, playlists }}>{title}</Link>
				</h2>
				<Link className="view-all" to='featured-playlists' state={{ title, playlists }}>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{playlists.items.slice(0, num).map(playlist => <PlaylistCard playlist={playlist} key={playlist.id} />)}
			</ul>
		</section>
	)
}

export default FeaturedPlaylists;
