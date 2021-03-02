import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArtistListItem from 'components/partials/lists/ArtistListItem';
import PageHeader from 'components/layout/PageHeader';
import Spinner from 'components/partials/Spinner';
import { getArtist, getArtistRelatedArtists } from 'services/spotifyAPI';
import './RelatedArtists.scss';

const RelatedArtists = () => {
	const { artistId } = useParams();
	const [artist, setArtist] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const FETCH_DATA = [
			getArtist(artistId),
			getArtistRelatedArtists(artistId),
		];
		Promise.all(FETCH_DATA)
			.then(data => {
				const [artist, relatedArtists] = data;
				setArtist(artist);
				setRelatedArtists(relatedArtists);
				setLoading(false);
			})
			.catch(error => console.log(error))
	}, [artistId])

	if (loading) {
		return <Spinner />;
	}

	return relatedArtists && (
		<main id="related-artists" className="main-view">
			<PageHeader title={`Artists like ${artist.name}`} />
			<section className="artists">
				<ul className="list">
					{relatedArtists.map(artist => <ArtistListItem artist={artist} key={artist.id} />)}
				</ul>
			</section>
		</main>
	)
}

export default RelatedArtists;
