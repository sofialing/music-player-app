import { useState, useEffect } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumCard from '../elements/AlbumCard';

const ArtistDiscography = ({ artistId }) => {
	const { spotify } = usePlayer();
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
			<header>
				<Link to='discography'>
					<h2>Discography</h2>
				</Link>
				<ChevronRightIcon />
			</header>
			<ul className="discography__grid">
				{discography.items.map((album, index) => <AlbumCard album={album} key={index} />)}
			</ul>
		</section>
	)
}

export default ArtistDiscography
