import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import usePagination from '../../hooks/usePagination'
import PageHeader from '../partials/PageHeader'
import AlbumCard from '../partials/AlbumCard'
import Pagination from '../partials/Pagination'
import './AllNewReleases.scss';

const AllNewReleases = () => {
	const { spotify } = useAuth();
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
		<main className="main-view new-releases-view">
			<PageHeader title="New Releases" />
			<section className="releases">
				<ul className="grid">
					{releases.total && releases.items.map((album, index) => <AlbumCard album={album} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllNewReleases
