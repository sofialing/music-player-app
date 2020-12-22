import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { usePlayer } from '../../contexts/PlayerContext';
import TopArtistsListItem from './TopArtistsListItem';

const TopArtists = () => {
	const { top_artists } = usePlayer();

	return (
		<section className="top-artists">
			<header>
				<Link to='top-artists'>
					<h2>Top Artists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="top-artists-list">
				{top_artists && top_artists.items.slice(0, 4).map((artist, index) => <TopArtistsListItem artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default TopArtists
