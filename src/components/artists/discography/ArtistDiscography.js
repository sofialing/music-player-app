import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../../contexts/PlayerContext';
import AlbumListItem from '../../elements/AlbumListItem'

const ArtistDiscography = () => {
	const navigate = useNavigate();
	const { artistId } = useParams();
	const { spotify } = usePlayer();
	const [artist, setArtist] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [singles, setSingles] = useState(null);
	const [compilations, setCompilations] = useState(null);

	useEffect(() => {
		spotify.getArtist(artistId)
			.then(data => setArtist(data.name))
			.catch(error => console.log(error))
		spotify.getArtistAlbums(artistId, { include_groups: 'album' })
			.then(data => setAlbums(data.items))
			.catch(error => console.log(error))
		spotify.getArtistAlbums(artistId, { include_groups: 'single' })
			.then(data => setSingles(data.items))
			.catch(error => console.log(error))
		spotify.getArtistAlbums(artistId, { include_groups: 'compilation' })
			.then(data => setCompilations(data.items))
			.catch(error => console.log(error))
	}, [artistId, spotify])

	return (
		<main className="discography-page">
			<header className="discography-page__header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<h1>{artist && `${artist} – discography`}</h1>
			</header>
			{albums &&
				<section>
					<h2>Albums</h2>
					<ul className="discography-list">
						{albums.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
					</ul>
				</section>
			}
			{singles &&
				<section>
					<h2>Singles</h2>
					<ul className="discography-list">
						{singles.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
					</ul>
				</section>
			}
			{compilations &&
				<section>
					<h2>Compilations</h2>
					<ul className="discography-list">
						{compilations.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
					</ul>
				</section>
			}

		</main>
	)
}

export default ArtistDiscography
