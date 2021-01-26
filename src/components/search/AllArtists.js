import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import ArtistListItem from '../partials/ArtistListItem';
import PageHeader from '../partials/PageHeader';
import Pagination from '../partials/Pagination';
import usePagination from '../../hooks/usePagination';
import './SearchResultsView.scss';

const AllArtists = () => {
	const { searchQuery } = useParams();
	const { spotify } = useAuth();
	const [artists, setArtists] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(artists);

	useEffect(() => {
		spotify.searchArtists(searchQuery, { limit, market: 'from_token', offset: (currentPage - 1) * limit })
			.then(({ artists }) => setArtists(artists))
			.catch(error => console.log(error));
	}, [searchQuery, spotify, currentPage, limit])

	return (
		<main className="main-view search-results-view">
			<PageHeader title={`All artists for '${searchQuery}'`} />
			<section className="artists">
				<ul className="list">
					{artists.total && artists.items.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllArtists
