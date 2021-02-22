import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PlaylistItem from 'components/partials/playlist/PlaylistItem';
import PageHeader from 'components/layout/PageHeader';
import Pagination from 'components/layout/Pagination';
import Spinner from 'components/partials/Spinner';
import usePagination from 'hooks/usePagination';
import { getUserPlaylists } from 'services/spotifyAPI';
import './Playlists.scss';

const Playlists = () => {
	const { userId } = useParams();
	const [loading, setLoading] = useState(true);
	const [userPlaylists, setUserPlaylists] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(userPlaylists);

	useEffect(() => {
		getUserPlaylists(userId, { limit, offset: (currentPage - 1) * limit })
			.then(playlists => {
				setUserPlaylists(playlists);
				setLoading(false);
			})
			.catch(error => console.log(error))
	}, [currentPage, limit, userId])

	if (loading) {
		return <Spinner />;
	}

	return userPlaylists && (
		<main id="playlists" className="main-view">
			<PageHeader title="Playlists" />
			<section className="playlists">
				<ul className="list">
					{userPlaylists.items.map(playlist => <PlaylistItem playlist={playlist} key={playlist.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default Playlists;
