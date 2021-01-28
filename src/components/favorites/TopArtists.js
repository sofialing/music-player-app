import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import useViewport from 'hooks/useViewport';
import ArtistCard from 'components/partials/artist/ArtistCard';
import './TopArtists.scss';

const TopArtists = () => {
	const { top_artists } = useAuth();
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return (
		<section className="top-artists">
			<header className="header">
				<h2 className="title">
					<Link to='top-artists'>Your top artists</Link>
				</h2>
				<Link className="view-all" to='top-artists'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{top_artists && top_artists.items.slice(0, items).map((artist, index) => <ArtistCard artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default TopArtists;
