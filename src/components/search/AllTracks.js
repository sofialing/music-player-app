import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext';
import TrackListItem from '../elements/TrackListItem';

const AllTracks = () => {
	const navigate = useNavigate();
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
			<header className="search-results-page__header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<h1>All tracks for '{searchQuery}'</h1>
			</header>
			<section>
				<ul>
					{tracks && tracks.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default AllTracks
