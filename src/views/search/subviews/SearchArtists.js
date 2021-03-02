import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ArtistListItem from 'components/partials/lists/ArtistListItem';
import PageHeader from 'components/layout/PageHeader';
import Pagination from 'components/layout/Pagination';
import usePagination from 'hooks/usePagination';
import { searchArtists } from 'services/spotifyAPI';

import './SearchResults.scss';

const SearchArtists = () => {
	const { searchQuery } = useParams();
	const [artists, setArtists] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(artists);

	useEffect(() => {
		searchArtists(searchQuery, { limit, offset: (currentPage - 1) * limit })
			.then(artists => setArtists(artists))
			.catch(error => console.log(error));
	}, [searchQuery, currentPage, limit])

	return (
		<main id="search-results" className="main-view">
			<PageHeader title={`All artists for '${searchQuery}'`} />
			<section className="artists">
				<ul className="list">
					{artists.total && artists.items.map(artist => <ArtistListItem artist={artist} key={artist.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default SearchArtists;
