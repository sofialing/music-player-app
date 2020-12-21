import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext';
import AlbumListItem from './AlbumListItem';

const AllAlbums = () => {
	const navigate = useNavigate();
	const { searchQuery } = useParams();
	const { spotify } = usePlayer();
	const [albums, setAlbums] = useState(null);

	useEffect(() => {
		spotify.searchAlbums(searchQuery)
			.then(({ albums }) => setAlbums(albums.items))
			.catch(error => console.log(error));
	}, [searchQuery, spotify])

	return (
		<div className="search-page container">
			<div className="search-results">
				<header className="search-results__header">
					<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
					<h1>All albums for '{searchQuery}'</h1>
				</header>
				<ul className="search-results__albums">
					{albums && albums.map((album, index) => <AlbumListItem album={album} key={index} />)}
				</ul>
			</div>
		</div>
	)
}

export default AllAlbums
