import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import ArtistListItem from '../elements/ArtistListItem';
import PageHeader from '../elements/PageHeader';

const AllRelatedArtists = () => {
	const { artistId } = useParams();
	const { spotify } = useAuth();
	const [artist, setArtist] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);

	useEffect(() => {
		spotify.getArtist(artistId)
			.then(data => setArtist(data.name))
			.catch(error => console.log(error))
		spotify.getArtistRelatedArtists(artistId)
			.then(data => setRelatedArtists(data.artists))
			.catch(error => console.log(error))
	}, [artistId, spotify])

	return (
		<main className="related-artists-page">
			<PageHeader title={`Artists like ${artist}`} />
			<section>
				<ul>
					{relatedArtists && relatedArtists.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</section>

		</main>
	)
}

export default AllRelatedArtists
