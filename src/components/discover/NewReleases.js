import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import AlbumCard from 'components/partials/album/AlbumCard';
import './NewReleases.scss';

const NewReleases = () => {
	const { spotify } = useAuth();
	const [releases, setReleases] = useState(null);

	useEffect(() => {
		const options = { country: 'from_token', limit: 20, timestamp: new Date().toISOString() };
		spotify.getNewReleases(options)
			.then(({ albums }) => setReleases(albums))
			.catch(error => console.log(error))

	}, [spotify])

	return releases && (
		<section className="new-releases">
			<header className="header">
				<Link to='new-releases' state={{ releases }}>
					<h2 className="title">New releases</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="grid">
				{releases && releases.items.slice(0, 4).map((album, index) => <AlbumCard album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default NewReleases;
