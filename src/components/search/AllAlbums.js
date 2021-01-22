import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import AlbumListItem from '../elements/AlbumListItem';
import PageHeader from '../elements/PageHeader';
import Pagination from '../elements/Pagination';
import usePagination from '../../hooks/usePagination';

const AllAlbums = () => {
	const { searchQuery } = useParams();
	const { spotify } = useAuth();
	const [albums, setAlbums] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(albums);

	useEffect(() => {
		spotify.searchAlbums(searchQuery, { limit, market: 'from_token', offset: (currentPage - 1) * limit })
			.then(({ albums }) => setAlbums(albums))
			.catch(error => console.log(error));
	}, [searchQuery, spotify, currentPage, limit, maxPage])

	return (
		<main className="main-view search-results-page">
			<PageHeader title={`All albums for '${searchQuery}'`} />
			<section>
				<ul>
					{albums.total && albums.items.map((album, index) => <AlbumListItem album={album} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default AllAlbums
