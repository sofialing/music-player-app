import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth } from 'contexts/AuthContext';
import SearchResults from 'components/search/SearchResults';
import './Search.scss';

const Search = () => {
	const navigate = useNavigate();
	const searchRef = useRef();
	const { searchQuery } = useParams();
	const { spotify } = useAuth();
	const [searchResults, setSearchResults] = useState(null);

	const getSearchResults = async () => {
		try {
			const results = await spotify.search(searchQuery, ['album', 'artist', 'track'], { limit: 5 });
			setSearchResults(results);
		} catch (error) {
			// TODO: handle error!
			console.log(error);
		}
	}

	const onSubmit = e => {
		e.preventDefault();

		if (!spotify) {
			return navigate('/');
		} else {
			navigate(`/search/${searchRef.current.value}`);
		}
	}

	useEffect(() => {
		searchRef.current.focus();

		if (searchQuery) {
			getSearchResults();
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (searchQuery) {
			getSearchResults();
		}
		// eslint-disable-next-line
	}, [searchQuery])

	return (
		<main id="search" className="main-view">
			<header className="header">
				<h1 className="title">Search music</h1>
			</header>
			<section className="search">
				<form className="search__form" role="search" onSubmit={onSubmit}>
					<input className="search__input" type="text" placeholder="Search for artists, songs and more" autoComplete="off" ref={searchRef} />
					<div className="search__icon">
						<SearchIcon />
					</div>
				</form>
				{searchResults && <SearchResults searchResults={searchResults} search={searchRef.current.value} />}
			</section>
		</main>
	)
}

export default Search;
