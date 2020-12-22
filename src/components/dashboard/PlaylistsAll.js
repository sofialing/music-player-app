import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext';
import PlaylistItem from '../elements/PlaylistItem';

const PlaylistsAll = () => {
	const navigate = useNavigate();
	const { playlists } = usePlayer();

	return (
		<main className="playlists-page">
			<header className="playlists-page__header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<h1>Playlists</h1>
			</header>
			<section>
				<ul className="playlists-list">
					{playlists && playlists.items.map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default PlaylistsAll
