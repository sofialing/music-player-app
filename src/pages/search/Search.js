import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { searchAll } from 'services/spotifyAPI';
import PageHeader from 'components/sections/PageHeader';
import GridSection from 'components/sections/GridSection';
import MainView from 'components/views/MainView';
import SearchField from 'components/SearchField';
import ErrorView from 'components/views/ErrorView';

const Search = () => {
	const navigate = useNavigate();
	const searchRef = useRef();
	const { searchQuery } = useParams();
	const [searchResults, setSearchResults] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		searchRef.current.focus();
	}, [])

	useEffect(() => {
		if (!searchQuery) {
			return;
		}

		searchAll(searchQuery, { limit: 6 })
			.then(results => setSearchResults(results))
			.catch(error => setError(error))
	}, [searchQuery])

	const onSubmit = e => {
		e.preventDefault();
		navigate(`/search/${searchRef.current.value}`);
	}

	if (error) {
		return <ErrorView />
	}

	return (
		<MainView id="search" pageTitle={searchQuery ? `Search: ${searchQuery}` : 'Search'}>
			<PageHeader title="Search music" />
			<SearchField searchRef={searchRef} onSubmit={onSubmit} />
			{searchResults && searchResults.map(result => (
				<GridSection title={result.type} link={result.next ? result.type : null} items={result.items} key={result.type} />
			))}
		</MainView>
	)
}

export default Search;
