import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { usePlayer } from '../../contexts/PlayerContext';
import PlaylistItem from '../elements/PlaylistItem';

const Playlists = () => {
	const { playlists } = usePlayer();

	return (
		<section className="playlists">
			<header>
				<Link to='playlists'>
					<h2>Playlists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul>
				{playlists && playlists.items.slice(0, 5).map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default Playlists
