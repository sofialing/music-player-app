import { usePlayer } from '../../contexts/PlayerContext';
import PlaylistItem from '../elements/PlaylistItem';
import PageHeader from '../elements/PageHeader';

const AllPlaylists = () => {
	const { playlists } = usePlayer();

	return (
		<main className="playlists-page">
			<PageHeader title="Playlists" />
			<section>
				<ul className="playlists-list">
					{playlists && playlists.items.map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllPlaylists
