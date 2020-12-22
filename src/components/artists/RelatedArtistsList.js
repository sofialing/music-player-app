import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArtistCard from '../elements/ArtistCard';

const RelatedArtistsList = ({ relatedArtists }) => {
	return (
		<section className="related-artists">
			<header>
				<Link to='related'><h2>Related Artists</h2></Link>
				<ChevronRightIcon />
			</header>
			<ul className="related-artists-grid">
				{relatedArtists.map((artist, index) => <ArtistCard artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default RelatedArtistsList
