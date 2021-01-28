import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import useViewport from 'hooks/useViewport';
import PlaylistCard from 'components/partials/playlist/PlaylistCard';
import './FeaturedPlaylists.scss';

const FeaturedPlaylists = () => {
	const { spotify } = useAuth();
	const { breakpoint_lg, width } = useViewport();
	const num = width <= breakpoint_lg ? 4 : 6;
	const [playlists, setPlaylists] = useState(null);
	const [title, setTitle] = useState('Featured playlists');

	useEffect(() => {
		const options = { country: 'from_token', timestamp: new Date().toISOString() };
		spotify.getFeaturedPlaylists(options)
			.then(({ message, playlists }) => {
				setTitle(message);
				setPlaylists(playlists);
			})
			.catch(error => console.log(error))

	}, [spotify])

	return playlists && (
		<section className="featured-playlists">
			<header className="header">
				<h2 className="title">
					<Link to='featured-playlists' state={{ title, playlists }}>{title}</Link>
				</h2>
				<Link className="view-all" to='featured-playlists' state={{ title, playlists }}>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{playlists && playlists.items.slice(0, num).map((playlist, index) => <PlaylistCard playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default FeaturedPlaylists;
