import { useParams } from 'react-router-dom'
import PageHeader from 'components/partials/PageHeader'
import AllAlbums from 'components/artist/discography/AllAlbums';
import AllCompilations from 'components/artist/discography/AllCompilations';
import AllSingles from 'components/artist/discography/AllSingles';
import './Discography.scss';

const Discography = () => {
	const { artistId } = useParams();

	return (
		<main id="discography" className="main-view">
			<PageHeader title="Discography" />
			<AllAlbums artistId={artistId} />
			<AllSingles artistId={artistId} />
			<AllCompilations artistId={artistId} />
		</main>
	)
}

export default Discography;
