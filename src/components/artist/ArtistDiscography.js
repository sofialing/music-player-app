import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumCard from 'components/partials/album/AlbumCard';
import useViewport from 'hooks/useViewport';
import './ArtistDiscography.scss';

const ArtistDiscography = ({ albums }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return albums && (
		<section className="discography">
			<header className="header">
				<h2 className="title">
					<Link to='discography'>Discography</Link>
				</h2>
				<Link className="view-all" to='discography'>
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

export default ArtistDiscography;
