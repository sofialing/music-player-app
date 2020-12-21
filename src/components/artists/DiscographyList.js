import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumListItem from './AlbumListItem';

const DiscographyList = ({ albums }) => {
	return (
		<section className="discography">
			<header>
				<Link to='discography'>
					<h2>Discography</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="discography-list">
				{albums.items.map((album, index) => <AlbumListItem album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default DiscographyList
