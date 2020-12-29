import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from '../../contexts/AuthContext';
import ArtistCard from '../elements/ArtistCard';

const TopArtists = () => {
	const { top_artists } = useAuth();

	return (
		<section className="top-artists">
			<header>
				<Link to='top-artists'>
					<h2>Top Artists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="top-artists-grid">
				{top_artists && top_artists.items.slice(0, 4).map((artist, index) => <ArtistCard artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default TopArtists
