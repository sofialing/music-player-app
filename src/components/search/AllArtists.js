import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext';
import ArtistListItem from '../elements/ArtistListItem';
import PageHeader from '../elements/PageHeader';
import Pagination from '../elements/Pagination';
import usePagination from '../../hooks/usePagination';

const AllArtists = () => {
	const { searchQuery } = useParams();
	const { spotify } = usePlayer();
	const [artists, setArtists] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(artists);

	useEffect(() => {
		spotify.searchArtists(searchQuery, { limit, market: 'from_token', offset: (currentPage - 1) * limit })
			.then(({ artists }) => setArtists(artists))
			.catch(error => console.log(error));
	}, [searchQuery, spotify, currentPage, limit])

	return (
		<main className="search-results-page">
			<PageHeader title={`All artists for '${searchQuery}'`} />
			<section>
				<ul>
					{artists.total && artists.items.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllArtists
