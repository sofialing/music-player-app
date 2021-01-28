import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import usePagination from 'hooks/usePagination';
import PageHeader from 'components/layout/PageHeader';
import AlbumCard from 'components/partials/album/AlbumCard';
import Pagination from 'components/layout/Pagination';
import './NewReleases.scss';

const NewReleases = () => {
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
		<main id="new-releases" className="main-view">
			<PageHeader title="New albums & singles" />
			<section className="releases">
				<ul className="grid">
					{releases.total && releases.items.map((album, index) => <AlbumCard album={album} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default NewReleases;
