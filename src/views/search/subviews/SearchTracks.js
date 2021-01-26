import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import usePagination from 'hooks/usePagination';
import TrackListItem from 'components/partials/TrackListItem';
import PageHeader from 'components/partials/PageHeader';
import Pagination from 'components/partials/Pagination';
import './SearchResults.scss';

const SearchTracks = () => {
	const { searchQuery } = useParams();
	const { spotify } = useAuth();
	const [tracks, setTracks] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(tracks);

	useEffect(() => {
		spotify.searchTracks(searchQuery, { limit, market: 'from_token', offset: (currentPage - 1) * limit })
			.then(({ tracks }) => setTracks(tracks))
			.catch(error => console.log(error));
	}, [searchQuery, spotify, currentPage, limit])

	return (
		<main id="search-results" className="main-view">
			<PageHeader title={`All tracks for '${searchQuery}'`} />
			<section className="tracks">
				<ul className="list">
					{tracks.total && tracks.items.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default SearchTracks;
