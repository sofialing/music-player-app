import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { usePlayer } from '../../contexts/PlayerContext';
import Navbar from '../Navbar';
import SearchResults from '../search/SearchResults';

const Search = () => {
	const [searchResults, setSearchResults] = useState(null);
	const searchRef = useRef();
	const { spotify } = usePlayer();
	const navigate = useNavigate();

	useEffect(() => {
		searchRef.current.focus();
	}, [])

	const handleSearch = (e) => {
		e.preventDefault();

		if (!spotify) {
			return navigate('/');
		}
		spotify.search(searchRef.current.value, ['album', 'artist', 'track'], { limit: 5 })
			.then(data => {
				setSearchResults(data);
				console.log(data);
			}).catch(e => {
				console.log(e)
			})
	}
	return (
		<div className="search-page container">
			<h1>Search</h1>
			<form className="search-box" role="search" onSubmit={handleSearch}>
				<input className="search-box__field" type="text" placeholder="Search for artists, songs and more" autoComplete="off" ref={searchRef} />
				<div className="search-box__icon">
					<SearchIcon />
				</div>
			</form>
			{searchResults && <SearchResults searchResults={searchResults} search={searchRef.current.value} />}
			<Navbar />
		</div>
	)
}

export default Search
