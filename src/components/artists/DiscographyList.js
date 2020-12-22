import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumCard from '../elements/AlbumCard';

const DiscographyList = ({ discography }) => {
	return (
		<section className="discography">
			<header>
				<Link to='discography'>
					<h2>Discography</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="discography__grid">
				{discography.items.map((album, index) => <AlbumCard album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default DiscographyList
