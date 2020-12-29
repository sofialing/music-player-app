import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from '../../contexts/AuthContext';
import PlaylistItem from '../elements/PlaylistItem';

const Playlists = () => {
	const { user_playlists } = useAuth();

	return (
		<section className="playlists">
			<header>
				<Link to='playlists'>
					<h2>Playlists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul>
				{user_playlists && user_playlists.items.slice(0, 5).map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default Playlists
