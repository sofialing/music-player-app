import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext';
import ArtistListItem from '../elements/ArtistListItem';

const TopArtistsAll = () => {
	const navigate = useNavigate();
	const { top_artists } = usePlayer();

	return (
		<main className="top-artists-page">
			<header className="top-artists-page__header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<h1>Top Artists</h1>
			</header>
			<section>
				<ul>
					{top_artists && top_artists.items.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</section>
		</main>
	)
}

export default TopArtistsAll
