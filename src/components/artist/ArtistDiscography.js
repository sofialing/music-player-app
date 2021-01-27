import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import AlbumCard from 'components/partials/album/AlbumCard';
import './ArtistDiscography.scss';

const ArtistDiscography = ({ artistId }) => {
	const { spotify } = useAuth();
	const [discography, setDiscography] = useState(null);

	useEffect(() => {
		async function getData() {
			const data = await spotify.getArtistAlbums(artistId, { limit: 4, country: 'from_token' });
			setDiscography(data);
		}
		getData();
	}, [artistId, spotify])

	return discography && (
		<section className="discography">
			<header className="header">
				<Link to='discography'>
					<h2 className="title">Discography</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="grid">
				{discography.items.map((album, index) => <AlbumCard album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default ArtistDiscography;
