import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePagination from 'hooks/usePagination';
import TrackListItem from 'components/partials/lists/TrackListItem';
import PageHeader from 'components/layout/PageHeader';
import Pagination from 'components/layout/Pagination';
import { searchTracks } from 'services/spotifyAPI';
import './SearchResults.scss';

const SearchTracks = () => {
	const { searchQuery } = useParams();
	const [tracks, setTracks] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(tracks);

	useEffect(() => {
		searchTracks(searchQuery, { limit, offset: (currentPage - 1) * limit })
			.then(tracks => setTracks(tracks))
			.catch(error => console.log(error));
	}, [searchQuery, currentPage, limit])

	return (
		<main id="search-results" className="main-view">
			<PageHeader title={`All tracks for '${searchQuery}'`} />
			<section className="tracks">
				<ul className="list">
					{tracks.total && tracks.items.map(track => <TrackListItem track={track} album={track.album} key={track.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default SearchTracks;
