import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistRelatedArtists } from 'services/spotifyAPI';
import ErrorView from 'components/views/ErrorView';
import PageHeader from 'components/sections/PageHeader';
import MainView from 'components/views/MainView';
import LoadingView from 'components/views/LoadingView';
import GridSection from 'components/sections/GridSection';

const RelatedArtists = () => {
	const { artistId } = useParams();
	const [artist, setArtist] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getArtistRelatedArtists(artistId)
			.then(({ artist, related }) => {
				setArtist(artist);
				setRelatedArtists(related);
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
		<MainView id="related-artists" pageTitle={artist}>
			<PageHeader title={`Artists like ${artist}`} />
			<GridSection items={relatedArtists} limit={18} />
		</MainView>
	)
}

export default RelatedArtists;
