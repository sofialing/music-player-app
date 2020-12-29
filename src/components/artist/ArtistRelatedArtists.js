import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArtistCard from '../elements/ArtistCard';

const ArtistRelatedArtists = ({ artistId }) => {
	const { spotify } = useAuth();
	const [relatedArtists, setRelatedArtists] = useState(null);

	useEffect(() => {
		async function getData() {
			const data = await spotify.getArtistRelatedArtists(artistId);
			setRelatedArtists(data.artists.slice(0, 4));
		}
		getData();
	}, [artistId, spotify])

	return relatedArtists && (
		<section className="related-artists">
			<header>
				<Link to='related'><h2>Related Artists</h2></Link>
				<ChevronRightIcon />
			</header>
			<ul className="related-artists-grid">
				{relatedArtists.map((artist, index) => <ArtistCard artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default ArtistRelatedArtists
