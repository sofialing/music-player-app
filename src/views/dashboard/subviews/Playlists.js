import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext';
import PlaylistItem from 'components/partials/PlaylistItem';
import PageHeader from 'components/partials/PageHeader';
import Pagination from 'components/partials/Pagination';
import usePagination from 'hooks/usePagination';
import './Playlists.scss';

const Playlists = () => {
	const { userId } = useParams();
	const { playlists, spotify } = useAuth();
	const [userPlaylists, setUserPlaylists] = useState(playlists);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(userPlaylists);

	useEffect(() => {
		spotify.getUserPlaylists(userId, { limit, offset: (currentPage - 1) * limit })
			.then(playlists => setUserPlaylists(playlists))
			.catch(error => console.log(error))
	}, [currentPage, limit, spotify, userId])

	return (
		<main id="playlists" className="main-view">
			<PageHeader title="Playlists" />
			<section className="playlists">
				<ul className="list">
					{userPlaylists && userPlaylists.items.map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default Playlists;
