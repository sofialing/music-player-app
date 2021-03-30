import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtist, getArtistRelatedArtists } from 'services/spotifyAPI';
import ErrorView from 'components/layout/views/ErrorView';
import PageHeader from 'components/layout/sections/PageHeader';
import MainView from 'components/layout/views/MainView';
import LoadingView from 'components/layout/views/LoadingView';
import GridSection from 'components/layout/sections/GridSection';

const RelatedArtists = () => {
	const { artistId } = useParams();
	const [artist, setArtist] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

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
			.catch(error => {
				setError(error);
				setLoading(false);
			})
	}, [artistId])

	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="related-artists" pageTitle={artist.name}>
			<PageHeader title={`Artists like ${artist.name}`} />
			<GridSection items={relatedArtists} limit={18} />
		</MainView>
	)
}

export default RelatedArtists;
