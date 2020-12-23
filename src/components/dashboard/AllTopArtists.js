import { usePlayer } from '../../contexts/PlayerContext';
import ArtistListItem from '../elements/ArtistListItem';
import PageHeader from '../elements/PageHeader';

const AllTopArtists = () => {
	const { top_artists } = usePlayer();

	return (
		<main className="top-artists-page">
			<PageHeader title={'Top Artists'} />
			<section>
				<ul>
					{top_artists && top_artists.items.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllTopArtists
