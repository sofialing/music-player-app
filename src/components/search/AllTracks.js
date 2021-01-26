import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import TrackListItem from '../partials/TrackListItem';
import PageHeader from '../partials/PageHeader';
import Pagination from '../partials/Pagination';
import usePagination from '../../hooks/usePagination';
import './SearchResultsView.scss';

const AllTracks = () => {
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
		<main className="main-view search-results-view">
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

export default AllTracks
