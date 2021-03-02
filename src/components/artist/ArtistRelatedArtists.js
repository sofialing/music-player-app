import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArtistCard from 'components/partials/cards/ArtistCard';
import useViewport from 'hooks/useViewport';
import './ArtistRelatedArtists.scss';

const ArtistRelatedArtists = ({ artists }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return artists && (
		<section className="related-artists">
			<header className="header">
				<h2 className="title">
					<Link to='related'>Related Artists</Link>
				</h2>
				<Link className="view-all" to='related'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{artists.slice(0, items).map(artist => <ArtistCard artist={artist} key={artist.id} />)}
			</ul>
		</section>
	)
}

export default ArtistRelatedArtists;
