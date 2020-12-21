import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const ArtistHeader = ({ artist }) => {
	const navigate = useNavigate();

	return (
		<header className="artist-page__header">
			<div className="artist-page__header__inner">
				<ArrowBackIosIcon onClick={() => navigate(-1)} />
				<img src={artist.images[1]['url']} alt={artist.name} />
				<h1>{artist.name}</h1>
				<p>{parseInt(artist.followers.total).toLocaleString()} fans</p>
			</div>
			<button className="playlist__play-btn">
				<PlaylistPlayIcon />
				<span>Play</span>
			</button>
		</header>
	)
}

export default ArtistHeader
