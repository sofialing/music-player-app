import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import usePagination from '../../hooks/usePagination'
import PageHeader from '../partials/PageHeader'
import PlaylistCard from '../partials/PlaylistCard'
import Pagination from '../partials/Pagination'
import './SingleCategory.scss';

const SingleCategory = () => {
	const { spotify } = useAuth();
	const { categoryId } = useParams();
	const [category, setCategory] = useState(null);
	const [playlists, setPlaylists] = useState([]);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(playlists);

	useEffect(() => {
		spotify.getCategory(categoryId, { country: 'from_token' })
			.then(category => setCategory(category))
			.catch(error => console.log(error))
		spotify.getCategoryPlaylists(categoryId, { country: 'from_token', offset: (currentPage - 1) * limit })
			.then(({ playlists }) => setPlaylists(playlists))
			.catch(error => console.log(error))
	}, [spotify, categoryId, currentPage, limit])

	return category && playlists && (
		<main className="main-view single-category-view">
			<PageHeader title={category.name} />
			<section className="categories">
				<ul className="grid">
					{playlists.total && playlists.items.map((playlist, index) => <PlaylistCard playlist={playlist} key={index} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default SingleCategory
