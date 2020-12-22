import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext';
import TrackListItem from '../search/TrackListItem';

const TopTracksAll = () => {
	const navigate = useNavigate();
	const { top_tracks } = usePlayer();

	return (
		<main className="top-tracks-page">
			<header className="top-tracks-page__header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<h1>Top Tracks</h1>
			</header>
			<section>
				<ul className="top-artists-list">
					{top_tracks && top_tracks.items.map((track, index) => <TrackListItem track={track} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default TopTracksAll
