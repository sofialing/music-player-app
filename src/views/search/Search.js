import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import SearchResults from 'components/search/SearchResults';
import { searchAll } from 'services/spotifyAPI';
import './Search.scss';

const Search = () => {
	const navigate = useNavigate();
	const searchRef = useRef();
	const { searchQuery } = useParams();
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		searchRef.current.focus();
	}, [])

	useEffect(() => {
		if (!searchQuery) {
			return;
		}

		searchAll(searchQuery, { limit: 6 })
			.then(results => setSearchResults(results))
			.catch(error => console.log(error))
	}, [searchQuery])

	const onSubmit = e => {
		e.preventDefault();
		navigate(`/search/${searchRef.current.value}`);
	}

	return (
		<main id="search" className="main-view">
			<header className="search__header">
				<h1 className="search__header--title">Search music</h1>
			</header>
			<section className="search-field">
				<form className="search-field__form" role="search" onSubmit={onSubmit}>
					<input className="search-field__form--input" type="text" placeholder="Search for artists, songs and tracks" autoComplete="off" ref={searchRef} />
					<div className="search-field__form--icon">
						<SearchIcon />
					</div>
				</form>
			</section>
			{searchResults && <SearchResults searchResults={searchResults} search={searchRef.current.value} />}
		</main>
	)
}

export default Search;
