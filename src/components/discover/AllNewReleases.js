import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext'
import usePagination from '../../hooks/usePagination'
import PageHeader from '../elements/PageHeader'
import AlbumCard from '../elements/AlbumCard'
import Pagination from '../elements/Pagination'

const AllNewReleases = () => {
	const { spotify } = usePlayer();
	const { state } = useLocation();
	const [releases, setReleases] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(releases);

	useEffect(() => {
		if (state && state.releases && currentPage === 1) {
			return setReleases(state.releases);
		}
		const options = {
			country: 'from_token',
			timestamp: new Date().toISOString(),
			offset: (currentPage - 1) * limit,
		};
		spotify.getNewReleases(options)
			.then(({ albums }) => setReleases(albums))
			.catch(error => console.log(error))

	}, [spotify, state, currentPage, limit])

	return releases && (
		<main className="new-releases-page">
			<PageHeader title="New Releases" />
			<section>
				<ul>
					{releases.total && releases.items.map((album, index) => <AlbumCard album={album} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllNewReleases
