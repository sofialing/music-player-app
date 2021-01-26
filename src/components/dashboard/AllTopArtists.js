import { useAuth } from '../../contexts/AuthContext';
import ArtistListItem from '../partials/ArtistListItem';
import PageHeader from '../partials/PageHeader';
import './AllTopArtists.scss';

const AllTopArtists = () => {
	const { top_artists } = useAuth();

	return (
		<main className="main-view top-artists-view">
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
