import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import usePagination from 'hooks/usePagination';
import PageHeader from 'components/layout/PageHeader';
import PlaylistCard from 'components/partials/playlist/PlaylistCard';
import Pagination from 'components/layout/Pagination';
import { getFeaturedPlaylists } from 'services/spotifyAPI';
import './FeaturedPlaylists.scss';

const FeaturedPlaylists = () => {
	const { state } = useLocation();
	const [playlists, setPlaylists] = useState([]);
	const [title, setTitle] = useState('');
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(playlists);

	useEffect(() => {
		if (state && state.playlists && currentPage === 1) {
			setTitle(state.title);
			setPlaylists(state.playlists);
			return;
		}

		getFeaturedPlaylists({ offset: (currentPage - 1) * limit })
			.then(({ playlists }) => setPlaylists(playlists))
			.catch(error => console.log(error));

	}, [state, currentPage, limit])

	return playlists && (
		<main id="featured-playlists" className="main-view">
			<PageHeader title={`Featured playlists: ${title}`} />
			<section className="playlists">
				<ul className="grid">
					{playlists.total && playlists.items.map(playlist => <PlaylistCard playlist={playlist} key={playlist.id} />)}
				</ul>
				<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
			</section>
		</main>
	)
}

export default FeaturedPlaylists;
