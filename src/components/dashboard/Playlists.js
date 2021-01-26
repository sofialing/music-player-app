import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from '../../contexts/AuthContext';
import PlaylistItem from '../partials/PlaylistItem';
import './Playlists.scss';

const Playlists = () => {
	const { user_playlists } = useAuth();

	return (
		<section className="playlists">
			<header className="header">
				<Link to='playlists'>
					<h2 className="title">Playlists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="list">
				{user_playlists && user_playlists.items.slice(0, 5).map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default Playlists;
