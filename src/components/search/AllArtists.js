import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext';
import ArtistListItem from './ArtistListItem';

const AllArtists = () => {
	const navigate = useNavigate();
	const { searchQuery } = useParams();
	const { spotify } = usePlayer();
	const [artists, setArtists] = useState(null);

	useEffect(() => {
		spotify.searchArtists(searchQuery)
			.then(({ artists }) => setArtists(artists.items))
			.catch(error => console.log(error));
	}, [searchQuery, spotify])

	return (
		<div className="search-page container">
			<div className="search-results">
				<header className="search-results__header">
					<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
					<h1>All artists for '{searchQuery}'</h1>
				</header>
				<ul className="search-results__artists">
					{artists && artists.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</div>
		</div>
	)
}

export default AllArtists
