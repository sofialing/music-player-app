import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import useViewport from 'hooks/useViewport';
import AlbumCard from 'components/partials/album/AlbumCard';
import './Albums.scss';

const Albums = () => {
	const { spotify, user } = useAuth();
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;
	const [albums, setAlbums] = useState(null);

	useEffect(() => {
		if (!user) {
			return;
		}
		spotify.getMySavedAlbums()
			.then(res => setAlbums(res))
			.catch(error => console.log(error));
	}, [spotify, user])

	return (
		<section className="albums">
			<header className="header">
				<h2 className="title">
					<Link to='albums'>Albums</Link>
				</h2>
				<Link className="view-all" to='albums'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{albums && albums.items.slice(0, items).map((item, index) => <AlbumCard album={item.album} key={index} />)}
			</ul>
		</section>
	)
}

export default Albums;
