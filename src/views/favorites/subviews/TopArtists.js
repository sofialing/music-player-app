import { useAuth } from 'contexts/AuthContext';
import ArtistCard from 'components/partials/cards/ArtistCard';
import PageHeader from 'components/layout/PageHeader';
import './TopArtists.scss';

const AllTopArtists = () => {
	const { top_artists } = useAuth();

	return (
		<main id="top-artists" className="main-view">
			<PageHeader title={'Your top artists'} />
			<section className="artists">
				<ul className="grid">
					{top_artists && top_artists.items.map(artist => <ArtistCard artist={artist} key={artist.id} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllTopArtists;
