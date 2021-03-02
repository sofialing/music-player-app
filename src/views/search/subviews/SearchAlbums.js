import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlbumListItem from 'components/partials/lists/AlbumListItem';
import PageHeader from 'components/layout/PageHeader';
import Pagination from 'components/layout/Pagination';
import usePagination from 'hooks/usePagination';
import { searchAlbums } from 'services/spotifyAPI';
import './SearchResults.scss';

const SearchAlbums = () => {
	const { searchQuery } = useParams();
	const [albums, setAlbums] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(albums);

	useEffect(() => {
		searchAlbums(searchQuery, { limit, offset: (currentPage - 1) * limit })
			.then(albums => setAlbums(albums))
			.catch(error => console.log(error));
	}, [searchQuery, currentPage, limit, maxPage])

	return (
		<main id="search-results" className="main-view">
			<PageHeader title={`All albums for '${searchQuery}'`} />
			<section className="albums">
				<ul className="list">
					{albums.total && albums.items.map(album => <AlbumListItem album={album} key={album.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default SearchAlbums;
