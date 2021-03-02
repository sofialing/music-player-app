import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import AlbumCard from 'components/partials/cards/AlbumCard';
import './Albums.scss';

const Albums = ({ albums }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return albums && (
		<section className="albums">
			<header className="header">
				<h2 className="title">
					<Link to='albums' state={{ albums }}>Albums</Link>
				</h2>
				<Link className="view-all" to='albums' state={{ albums }}>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{albums.items.slice(0, items).map(album => <AlbumCard album={album} key={album.id} />)}
			</ul>
		</section>
	)
}

export default Albums;
