import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import useViewport from 'hooks/useViewport';
import ArtistCard from 'components/partials/artist/ArtistCard';
import './Artists.scss';

const Artists = () => {
	const { spotify, user } = useAuth();
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;
	const [artists, setArtists] = useState(null);

	useEffect(() => {
		if (!user) {
			return;
		}
		spotify.getFollowedArtists()
			.then(res => setArtists(res.artists))
			.catch(error => console.log('error', error));
	}, [spotify, user])

	return (
		<section className="artists">
			<header className="header">
				<h2 className="title">
					<Link to='artists'>Artists</Link>
				</h2>
				<Link className="view-all" to='artists'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{artists && artists.items.slice(0, items).map((artist, index) => <ArtistCard artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default Artists;
