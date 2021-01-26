import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import ArtistListItem from 'components/partials/ArtistListItem';
import PageHeader from 'components/partials/PageHeader';
import './RelatedArtists.scss';

const RelatedArtists = () => {
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
		<main id="related-artists" className="main-view">
			<PageHeader title={`Artists like ${artist}`} />
			<section className="artists">
				<ul className="list">
					{relatedArtists && relatedArtists.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default RelatedArtists;
