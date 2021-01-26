import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext'
import ArtistCard from 'components/partials/ArtistCard';
import './ArtistRelatedArtists.scss';

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
			<header className="header">
				<Link to='related'>
					<h2 className="title">Related Artists</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="grid">
				{relatedArtists.map((artist, index) => <ArtistCard artist={artist} key={index} />)}
			</ul>
		</section>
	)
}

export default ArtistRelatedArtists;
