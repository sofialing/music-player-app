import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext';
import TrackListItem from './TrackListItem';

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
		<div className="search-page container">
			<div className="search-results">
				<header className="search-results__header">
					<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
					<h1>All tracks for '{searchQuery}'</h1>
				</header>
				<ul className="search-results__tracks">
					{tracks && tracks.map((track, index) => <TrackListItem track={track} key={index} />)}
				</ul>
			</div>
		</div>
	)
}

export default AllTracks
