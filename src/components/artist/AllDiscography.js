import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext';
import AlbumListItem from '../elements/AlbumListItem'
import PageHeader from '../elements/PageHeader'

const AllDiscography = () => {
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
			.then(data => {
				if (data.total) {
					setAlbums(data.items)
				}
			})
			.catch(error => console.log(error))
		spotify.getArtistAlbums(artistId, { include_groups: 'single' })
			.then(data => {
				if (data.total) {
					setSingles(data.items)
				}
			})
			.catch(error => console.log(error))
		spotify.getArtistAlbums(artistId, { include_groups: 'compilation' })
			.then(data => {
				if (data.total) {
					setCompilations(data.items)
				}
			})
			.catch(error => console.log(error))
	}, [artistId, spotify])

	return (
		<main className="discography-page">
			<PageHeader title={`${artist} Discography`} />
			{albums &&
				<section>
					<h2>Albums</h2>
					<ul>
						{albums.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
					</ul>
				</section>
			}
			{singles &&
				<section>
					<h2>Singles</h2>
					<ul>
						{singles.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
					</ul>
				</section>
			}
			{compilations &&
				<section>
					<h2>Compilations</h2>
					<ul>
						{compilations.map((album, index) => <AlbumListItem album={album} displayArtist={false} key={index} />)}
					</ul>
				</section>
			}

		</main>
	)
}

export default AllDiscography
