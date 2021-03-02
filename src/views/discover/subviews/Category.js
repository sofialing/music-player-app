import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import usePagination from 'hooks/usePagination';
import PageHeader from 'components/layout/PageHeader';
import PlaylistCard from 'components/partials/cards/PlaylistCard';
import Pagination from 'components/layout/Pagination';
import { getCategory, getCategoryPlaylists } from 'services/spotifyAPI';
import './Category.scss';

const Category = () => {
	const { state } = useLocation();
	const { categoryId } = useParams();
	const [category, setCategory] = useState(null);
	const [playlists, setPlaylists] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(playlists);

	useEffect(() => {
		if (state && state.category) {
			setCategory(state.category);
		} else {
			getCategory(categoryId)
				.then(data => setCategory(data))
				.catch(error => console.log(error))
		}

		getCategoryPlaylists(categoryId, { offset: (currentPage - 1) * limit })
			.then(data => setPlaylists(data))
			.catch(error => console.log(error))

	}, [state, categoryId, currentPage, limit])

	return category && playlists && (
		<main id="category" className="main-view">
			<PageHeader title={category.name} />
			<section className="categories">
				<ul className="grid">
					{playlists.total && playlists.items.map(playlist => <PlaylistCard playlist={playlist} key={playlist.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default Category;
