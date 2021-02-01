import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useAuth } from 'contexts/AuthContext';
import useViewport from 'hooks/useViewport';
import TrackCard from 'components/partials/track/TrackCard';
import './SavedTracks.scss';

const SavedTracks = () => {
	const { spotify, user } = useAuth();
	const { breakpoint_lg, width } = useViewport();
	const items = width <= breakpoint_lg ? 4 : 6;
	const [tracks, setTracks] = useState(null);

	useEffect(() => {
		if (!user) {
			return;
		}
		spotify.getMySavedTracks()
			.then(res => {
				console.log('res', res);
				setTracks(res)
			})
			.catch(error => console.log('error', error));
	}, [spotify, user])

	return (
		<section className="saved-tracks">
			<header className="header">
				<h2 className="title">
					<Link to='tracks'>Your saved tracks</Link>
				</h2>
				<Link className="view-all" to='tracks'>
					<span>View all</span>
					<ChevronRightIcon />
				</Link>
			</header>
			<ul className="grid">
				{tracks && tracks.items.slice(0, items).map((item, index) => <TrackCard track={item.track} album={item.track.album} key={index} />)}
			</ul>
		</section>
	)
}

export default SavedTracks;
