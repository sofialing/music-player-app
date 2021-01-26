import { useParams } from 'react-router-dom'
import PageHeader from '../partials/PageHeader'
import AllAlbums from './discography/AllAlbums';
import AllCompilations from './discography/AllCompilations';
import AllSingles from './discography/AllSingles';

const AllDiscography = () => {
	const { artistId } = useParams();

	return (
		<main className="main-view discography-page">
			<PageHeader title="Discography" />
			<AllAlbums artistId={artistId} />
			<AllSingles artistId={artistId} />
			<AllCompilations artistId={artistId} />
		</main>
	)
}

export default AllDiscography
