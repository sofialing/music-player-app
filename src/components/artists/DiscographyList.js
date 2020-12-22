import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DiscographyListItem from './DiscographyListItem';

const DiscographyList = ({ discography }) => {
	return (
		<section className="discography">
			<header>
				<Link to='discography'>
					<h2>Discography</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="discography-list">
				{discography.items.map((album, index) => <DiscographyListItem album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default DiscographyList
