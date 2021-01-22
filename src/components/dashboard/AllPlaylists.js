import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import PlaylistItem from '../elements/PlaylistItem';
import PageHeader from '../elements/PageHeader';
import Pagination from '../elements/Pagination';
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
		<main className="main-view playlists-page">
			<PageHeader title="Playlists" />
			<section>
				<ul className="playlists-list">
					{userPlaylists && userPlaylists.items.map((playlist, index) => <PlaylistItem playlist={playlist} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllPlaylists
