import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext';
import AlbumListItem from '../elements/AlbumListItem';
import PageHeader from '../elements/PageHeader';

const AllAlbums = () => {
	const { searchQuery } = useParams();
	const { spotify } = usePlayer();
	const [albums, setAlbums] = useState(null);

	useEffect(() => {
		spotify.searchAlbums(searchQuery)
			.then(({ albums }) => setAlbums(albums.items))
			.catch(error => console.log(error));
	}, [searchQuery, spotify])

	return (
		<main className="search-results-page">
			<PageHeader title={`All albums for '${searchQuery}'`} />
			<section>
				<ul>
					{albums && albums.map((album, index) => <AlbumListItem album={album} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllAlbums
