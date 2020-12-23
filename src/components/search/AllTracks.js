import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { usePlayer } from '../../contexts/PlayerContext';
import TrackListItem from '../elements/TrackListItem';
import PageHeader from '../elements/PageHeader';

const AllTracks = () => {
	const { searchQuery } = useParams();
	const { spotify } = usePlayer();
	const [tracks, setTracks] = useState(null);

	useEffect(() => {
		spotify.searchTracks(searchQuery)
			.then(({ tracks }) => setTracks(tracks.items))
			.catch(error => console.log(error));
	}, [searchQuery, spotify])

	return (
		<main className="search-results-page">
			<PageHeader title={`All tracks for '${searchQuery}'`} />
			<section>
				<ul>
					{tracks && tracks.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllTracks
