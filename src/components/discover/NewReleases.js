import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useViewport from 'hooks/useViewport';
import AlbumCard from 'components/partials/album/AlbumCard';
import './NewReleases.scss';

const NewReleases = ({ releases }) => {
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;

	return releases && (
		<section className="new-releases">
			<header className="header">
				<h2 className="title">
					<Link to='new-releases' state={{ releases }}>New albums & singles</Link>
				</h2>
				<Link className="view-all" to='new-releases' state={{ releases }}>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{releases.items.slice(0, items).map((album, index) => <AlbumCard album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default NewReleases;
