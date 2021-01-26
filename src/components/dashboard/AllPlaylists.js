import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import PlaylistItem from '../partials/PlaylistItem';
import PageHeader from '../partials/PageHeader';
import Pagination from '../partials/Pagination';
import usePagination from '../../hooks/usePagination';

const AllPlaylists = () => {
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
		<main className="main-view playlists-view">
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

export default AllPlaylists
