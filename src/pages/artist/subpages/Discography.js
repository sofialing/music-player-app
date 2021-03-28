import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistAlbums } from 'services/spotifyAPI';
import ErrorView from 'components/layout/views/ErrorView';
import PageHeader from 'components/layout/sections/PageHeader';
import ListSection from 'components/layout/sections/ListSection';
import MainView from 'components/layout/views/MainView';
import LoadingView from 'components/layout/views/LoadingView';


const Discography = () => {
	const { artistId } = useParams();
	const [albums, setAlbums] = useState(null);
	const [compilations, setCompilations] = useState(null);
	const [singles, setSingles] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const FETCH_DATA = [
			getArtistAlbums(artistId, { include_groups: 'album' }),
			getArtistAlbums(artistId, { include_groups: 'compilation' }),
			getArtistAlbums(artistId, { include_groups: 'single' }),
		];
		Promise.all(FETCH_DATA)
			.then(data => {
				const [albums, compilations, singles] = data;
				document.title = process.env.REACT_APP_PAGE_TITLE + 'Discography';
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
		<MainView id="artist-discography">
			<PageHeader title="Discography" />
			{albums.total && <ListSection items={albums.items} title="Albums" />}
			{singles.total && <ListSection items={singles.items} title="Singles" />}
			{compilations.total && <ListSection items={compilations.items} title="Compilation" />}
		</MainView>
	)
}

export default Discography;
