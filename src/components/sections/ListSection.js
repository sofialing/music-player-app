
import ArtistListItem from 'components/list-items/ArtistListItem';
import AlbumListItem from 'components/list-items/AlbumListItem';
import TrackListItem from 'components/list-items/TrackListItem';
import PlaylistItem from 'components/list-items/PlaylistItem';

const ListSection = ({ items, title = null }) => {

	const renderList = (type, item) => {
		switch (type) {
			case 'album':
			case 'compilation':
			case 'single':
				return <AlbumListItem album={item} key={item.id} />;
			case 'artist':
				return <ArtistListItem artist={item} key={item.id} />;
			case 'track':
			case 'episode':
				return <TrackListItem track={item} key={item.id} />;
			case 'playlist':
				return <PlaylistItem playlist={item} key={item.id} />;
			default:
				break;
		}
	}

	return (
		<section className="list-section">
			{title && <h2 className="list-section__title">{title}</h2>}
			<ul className="list-section__list">
				{items.length
					? items.map(item => renderList(item.type, item))
					: <li>Nothing to display.</li>
				}
			</ul>
		</section>
	)
}

export default ListSection;
