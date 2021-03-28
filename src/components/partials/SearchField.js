import SearchIcon from '@material-ui/icons/Search';

const SearchField = ({ searchRef, onSubmit }) => {
	return (
		<section className="search-field">
			<form className="search-field__form" role="search" onSubmit={onSubmit}>
				<input className="search-field__form--input" type="text" placeholder="Search for artists, songs and tracks" autoComplete="off" ref={searchRef} />
				<span className="search-field__form--icon">
					<SearchIcon />
				</span>
			</form>
		</section>
	)
}

export default SearchField;

