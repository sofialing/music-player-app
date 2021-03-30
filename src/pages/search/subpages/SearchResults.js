import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchAlbums, searchArtists, searchTracks } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import MainView from 'components/layout/views/MainView';
import Pagination from 'components/layout/navigation/Pagination';
import PageHeader from 'components/layout/sections/PageHeader';
import ListSection from 'components/layout/sections/ListSection';
import ErrorView from 'components/layout/views/ErrorView';
import LoadingView from 'components/layout/views/LoadingView';

const SearchResults = ({ type }) => {
	const { searchQuery } = useParams();
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(results);

	useEffect(() => {
		const options = { limit, offset: (currentPage - 1) * limit };
		switch (type) {
			case 'albums':
				return searchAlbums(searchQuery, options)
					.then(albums => {
						setResults(albums);
						setLoading(false);
					})
					.catch(error => setError(error));
			case 'artists':
				return searchArtists(searchQuery, options)
					.then(artists => {
						setResults(artists);
						setLoading(false);
					})
					.catch(error => setError(error));
			case 'tracks':
				return searchTracks(searchQuery, options)
					.then(tracks => {
						setResults(tracks);
						setLoading(false);
					})
					.catch(error => setError(error));
			default:
				return null;
		}
	}, [searchQuery, currentPage, limit, type])


	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView pageTitle={`Search: ${searchQuery}`}>
			<PageHeader title={`All ${type} for '${searchQuery}'`} />
			<ListSection type={type} items={results.items} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default SearchResults;
