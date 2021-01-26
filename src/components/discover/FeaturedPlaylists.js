import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useAuth } from '../../contexts/AuthContext'
import PlaylistCard from '../partials/PlaylistCard'
import './FeaturedPlaylists.scss';

const FeaturedPlaylists = () => {
	const { spotify } = useAuth();
	const [playlists, setPlaylists] = useState(null);

	useEffect(() => {
		const options = { country: 'from_token', timestamp: new Date().toISOString() };
		spotify.getFeaturedPlaylists(options)
			.then(({ playlists }) => setPlaylists(playlists))
			.catch(error => console.log(error))

	}, [spotify])

	return playlists && (
		<section className="featured-playlists">
			<header className="header">
				<Link to='featured-playlists' state={{ playlists }}>
					<h2 className="title">Featured playlists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="grid">
				{playlists && playlists.items.slice(0, 6).map((playlist, index) => <PlaylistCard playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default FeaturedPlaylists
