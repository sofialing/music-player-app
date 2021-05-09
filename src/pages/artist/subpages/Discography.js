import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistDiscography } from 'services/spotifyAPI';
import ErrorView from 'components/views/ErrorView';
import PageHeader from 'components/sections/PageHeader';
import ListSection from 'components/sections/ListSection';
import MainView from 'components/views/MainView';
import LoadingView from 'components/views/LoadingView';


const Discography = () => {
	const { artistId } = useParams();
	const [albums, setAlbums] = useState(null);
	const [compilations, setCompilations] = useState(null);
	const [singles, setSingles] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getArtistDiscography(artistId)
			.then(data => {
				const [albums, compilations, singles] = data;
				setAlbums(albums);
				setCompilations(compilations);
				setSingles(singles);
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
		<MainView id="artist-discography" pageTitle="Discography">
			<PageHeader title="Discography" />
			{albums.total && <ListSection items={albums.items} title="Albums" />}
			{singles.total && <ListSection items={singles.items} title="Singles" />}
			{compilations.total && <ListSection items={compilations.items} title="Compilation" />}
		</MainView>
	)
}

export default Discography;
