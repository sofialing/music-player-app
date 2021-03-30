import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { searchAll } from 'services/spotifyAPI';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';
import MainView from 'components/layout/views/MainView';
import SearchField from 'components/partials/SearchField';

const Search = () => {
	const navigate = useNavigate();
	const searchRef = useRef();
	const { searchQuery } = useParams();
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		searchRef.current.focus();
		document.title = process.env.REACT_APP_PAGE_TITLE + 'Search';
	}, [])

	useEffect(() => {
		if (!searchQuery) {
			return;
		}

		document.title = process.env.REACT_APP_PAGE_TITLE + 'Search: ' + searchQuery;

		searchAll(searchQuery, { limit: 6 })
			.then(results => setSearchResults(results))
			.catch(error => console.log(error))
	}, [searchQuery])

	const onSubmit = e => {
		e.preventDefault();
		navigate(`/search/${searchRef.current.value}`);
	}

	return (
		<MainView id="search" pageTitle={searchQuery ? `Search: ${searchQuery}` : 'Search'}>
			<PageHeader title="Search music" />
			<SearchField searchRef={searchRef} onSubmit={onSubmit} />
			{searchResults && searchResults.map(result => (
				<GridSection title={result.type} link={result.next ? result.type : null} items={result.items} key={result.type}>
					{!result.total ? <p>No {result.type} found for '{searchRef.current.value}'.</p> : ''}
				</GridSection>
			))}
		</MainView>
	)
}

export default Search;
