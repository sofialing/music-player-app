import { useAuth } from 'contexts/AuthContext';
import ArtistListItem from 'components/partials/ArtistListItem';
import PageHeader from 'components/partials/PageHeader';
import './TopArtists.scss';

const AllTopArtists = () => {
	const { top_artists } = useAuth();

	return (
		<main id="top-artists" className="main-view">
			<PageHeader title={'Top Artists'} />
			<section className="artists">
				<ul className="list">
					{top_artists && top_artists.items.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllTopArtists;
