import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { usePlayer } from '../../contexts/PlayerContext';
import SearchResults from '../search/SearchResults';

const Search = () => {
	const navigate = useNavigate();
	const searchRef = useRef();
	const { searchQuery } = useParams();
	const { spotify } = usePlayer();
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
		<div className="search-page container">
			<h1>Search</h1>
			<form className="search-box" role="search" onSubmit={onSubmit}>
				<input className="search-box__field" type="text" placeholder="Search for artists, songs and more" autoComplete="off" ref={searchRef} />
				<div className="search-box__icon">
					<SearchIcon />
				</div>
			</form>
			{searchResults && <SearchResults searchResults={searchResults} search={searchRef.current.value} />}
		</div>
	)
}

export default Search
