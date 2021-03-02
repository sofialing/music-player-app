import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import AlbumCard from 'components/partials/cards/AlbumCard';
import ArtistCard from 'components/partials/cards/ArtistCard';
import TrackCard from 'components/partials/cards/TrackCard';
import './SearchResults.scss';

const SearchResults = ({ searchResults, search }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	const renderCard = (type, item) => {
		switch (type) {
			case 'albums':
				return <AlbumCard album={item} />;
			case 'artists':
				return <ArtistCard artist={item} />;
			case 'tracks':
				return <TrackCard track={item} album={item.album} />;
			default:
				return null;
		}
	}

	return searchResults.map(result => (
		<section className="search-results">
			<header className="search-results__header">
				<h3 className="search-results__header--title">{result.type}</h3>
				{result.next ? (
					<Link className="view-all" to={result.type}>
						<span>View all {result.type}</span>
						<ChevronRightIcon />
					</Link>
				) : ''}
			</header>
			{result.total ? (
				<ul className="search-results__grid">
					{result.items.slice(0, items).map(item => renderCard(result.type, item))}
				</ul>
			) : <p>No {result.type} found for '{search}'.</p>}
		</section>
	))
}
export default SearchResults;
