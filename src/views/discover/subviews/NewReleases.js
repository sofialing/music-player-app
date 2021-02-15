import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import usePagination from 'hooks/usePagination';
import PageHeader from 'components/layout/PageHeader';
import AlbumCard from 'components/partials/album/AlbumCard';
import Pagination from 'components/layout/Pagination';
import { getNewReleases } from 'services/spotifyAPI';
import './NewReleases.scss';

const NewReleases = () => {
	const { state } = useLocation();
	const [releases, setReleases] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(releases);

	useEffect(() => {
		if (state && state.releases && currentPage === 1) {
			return setReleases(state.releases);
		}

		getNewReleases({ offset: (currentPage - 1) * limit })
			.then(data => setReleases(data))
			.catch(error => console.log(error))

	}, [state, currentPage, limit])

	return releases && (
		<main id="new-releases" className="main-view">
			<PageHeader title="New albums & singles" />
			<section className="releases">
				<ul className="grid">
					{releases.total && releases.items.map(album => <AlbumCard album={album} key={album.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default NewReleases;
