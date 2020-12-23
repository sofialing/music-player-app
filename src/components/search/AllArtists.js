import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext';
import ArtistListItem from '../elements/ArtistListItem';
import PageHeader from '../elements/PageHeader';

const AllArtists = () => {
	const { searchQuery } = useParams();
	const { spotify } = usePlayer();
	const [artists, setArtists] = useState(null);

	useEffect(() => {
		spotify.searchArtists(searchQuery)
			.then(({ artists }) => setArtists(artists.items))
			.catch(error => console.log(error));
	}, [searchQuery, spotify])

	return (
		<main className="search-results-page">
			<PageHeader title={`All artists for '${searchQuery}'`} />
			<section>
				<ul>
					{artists && artists.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllArtists
