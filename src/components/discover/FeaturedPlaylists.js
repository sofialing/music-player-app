import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { usePlayer } from '../../contexts/PlayerContext'
import PlaylistCard from '../elements/PlaylistCard'

const FeaturedPlaylists = () => {
	const { spotify } = usePlayer();
	const [playlists, setPlaylists] = useState(null);

	useEffect(() => {
		const options = { country: 'from_token', timestamp: new Date().toISOString() };
		spotify.getFeaturedPlaylists(options)
			.then(({ playlists }) => setPlaylists(playlists))
			.catch(error => console.log(error))

	}, [spotify])

	return playlists && (
		<section>
			<header>
				<Link to='featured-playlists' state={{ playlists }}>
					<h2>Featured Playlists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="featured-playlists__grid">
				{playlists && playlists.items.slice(0, 6).map((playlist, index) => <PlaylistCard playlist={playlist} key={index} />)}
			</ul>
		</section>
	)
}

export default FeaturedPlaylists
