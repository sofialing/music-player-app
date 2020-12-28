import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { usePlayer } from '../../contexts/PlayerContext'
import AlbumCard from '../elements/AlbumCard'

const NewReleases = () => {
	const { spotify } = usePlayer();
	const [releases, setReleases] = useState(null);

	useEffect(() => {
		const options = { country: 'from_token', timestamp: new Date().toISOString() };
		spotify.getNewReleases(options)
			.then(({ albums }) => setReleases(albums))
			.catch(error => console.log(error))

	}, [spotify])

	return releases && (
		<section>
			<header>
				<Link to='releases'>
					<h2>New Releases</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="releases__grid">
				{releases && releases.items.splice(0, 4).map((album, index) => <AlbumCard album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default NewReleases
