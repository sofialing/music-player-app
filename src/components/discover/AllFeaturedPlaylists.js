import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext'
import usePagination from '../../hooks/usePagination'
import PageHeader from '../elements/PageHeader'
import PlaylistCard from '../elements/PlaylistCard'
import Pagination from '../elements/Pagination'

const AllFeaturedPlaylists = () => {
	const { spotify } = usePlayer();
	const { state } = useLocation();
	const [playlists, setPlaylists] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(playlists);

	useEffect(() => {
		if (state && state.playlists && currentPage === 1) {
			return setPlaylists(state.playlists);
		}
		const options = {
			country: 'from_token',
			timestamp: new Date().toISOString(),
			offset: (currentPage - 1) * limit,
		};
		spotify.getFeaturedPlaylists(options)
			.then(({ playlists }) => setPlaylists(playlists))
			.catch(error => console.log(error))

	}, [spotify, state, currentPage, limit])

	return playlists && (
		<main className="featured-playlists-page">
			<PageHeader title="Featured playlists" />
			<section>
				<ul>
					{playlists.total && playlists.items.map((playlist, index) => <PlaylistCard playlist={playlist} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllFeaturedPlaylists
