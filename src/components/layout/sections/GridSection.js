import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumCard from 'components/partials/cards/AlbumCard';
import TrackCard from 'components/partials/cards/TrackCard';
import ArtistCard from 'components/partials/cards/ArtistCard';
import PlaylistCard from 'components/partials/cards/PlaylistCard';
import CategoryCard from 'components/partials/cards/CategoryCard';
import useViewport from 'hooks/useViewport';

const GridSection = ({ items, title = null, link = null, limit = null }) => {
	const { gridItems } = useViewport();

	const renderCard = (type, item) => {
		switch (type) {
			case 'album':
			case 'compilation':
			case 'single':
				return <AlbumCard album={item} key={item.id} />;
			case 'artist':
				return <ArtistCard artist={item} key={item.id} />;
			case 'track':
				return <TrackCard track={item} album={item.album} key={item.id} />;
			case 'playlist':
				return <PlaylistCard playlist={item} key={item.id} />;
			case 'category':
				return <CategoryCard category={item} key={item.id} />;
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
				{items.slice(0, limit || gridItems).map(item => renderCard(item.type, item))}
			</ul>
		</section>
	)
}

export default GridSection;
