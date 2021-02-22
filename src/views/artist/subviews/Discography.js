import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from 'components/layout/PageHeader';
import AllAlbums from 'components/artist/discography/AllAlbums';
import AllCompilations from 'components/artist/discography/AllCompilations';
import AllSingles from 'components/artist/discography/AllSingles';
import Spinner from 'components/partials/Spinner';
import { getArtistAlbums } from 'services/spotifyAPI';
import './Discography.scss';

const Discography = () => {
	const { artistId } = useParams();
	const [albums, setAlbums] = useState(null);
	const [compilations, setCompilations] = useState(null);
	const [singles, setSingles] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const FETCH_DATA = [
			getArtistAlbums(artistId, { include_groups: 'album' }),
			getArtistAlbums(artistId, { include_groups: 'compilation' }),
			getArtistAlbums(artistId, { include_groups: 'single' }),
		];
		Promise.all(FETCH_DATA)
			.then(data => {
				const [albums, compilations, singles] = data;
				setAlbums(albums);
				setCompilations(compilations);
				setSingles(singles);
				setLoading(false);
			})
			.catch(error => console.log(error))
	}, [artistId])

	if (loading) {
		return <Spinner />;
	}

	return (
		<main id="discography" className="main-view">
			<PageHeader title="Discography" />
			<AllAlbums albums={albums} />
			<AllSingles singles={singles} />
			<AllCompilations compilations={compilations} />
		</main>
	)
}

export default Discography;
