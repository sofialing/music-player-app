import { Link } from 'react-router-dom';
import { useViewport } from 'contexts/ViewportContext';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumCard from 'components/cards/AlbumCard';
import TrackCard from 'components/cards/TrackCard';
import ArtistCard from 'components/cards/ArtistCard';
import PlaylistCard from 'components/cards/PlaylistCard';
import CategoryCard from 'components/cards/CategoryCard';

const GridSection = ({ items, title = null, link = null, limit = null }) => {
	const { gridItems } = useViewport();

	const renderCard = (type, item, i) => {
		switch (type) {
			case 'album':
			case 'compilation':
			case 'single':
				return <AlbumCard album={item} key={`${item.id}-${i}`} />;
			case 'artist':
				return <ArtistCard artist={item} key={`${item.id}-${i}`} />;
			case 'track':
				return <TrackCard track={item} key={`${item.id}-${i}`} />;
			case 'playlist':
				return <PlaylistCard playlist={item} key={`${item.id}-${i}`} />;
			case 'category':
				return <CategoryCard category={item} key={`${item.id}-${i}`} />;
			default:
				return null;
		}
	}

	return (
		<section className="grid-section">
			<header className="grid-section__header">
				<h2 className="grid-section__header--title">{title}</h2>
				{link && <Link className="grid-section__header--link" to={link}><span>View all</span><ChevronRightIcon /></Link>}
			</header>
			<ul className="grid-section__grid">
				{items.length
					? (items.slice(0, limit || gridItems).map((item, i) => renderCard(item.type, item, i)))
					: <li>Nothing to display</li>
				}
			</ul>
		</section>
	)
}

export default GridSection;
