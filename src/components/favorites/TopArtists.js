import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import ArtistCard from 'components/partials/cards/ArtistCard';
import './TopArtists.scss';

const TopArtists = ({ artists }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return artists && (
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
				{artists.items.slice(0, items).map(artist =>
					<ArtistCard artist={artist} key={artist.id} />
				)}
			</ul>
		</section>
	)
}

export default TopArtists;
