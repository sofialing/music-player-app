import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PlayButton from 'components/partials/PlayButton';
import './ArtistHeader.scss';

const ArtistHeader = ({ artist }) => {
	const navigate = useNavigate();

	return (
		<header className="artist-header">
			<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} title="Go back" />
			<img className="cover-img" src={artist.image_url} alt="artist cover" />
			<div>
				<h2 className="sub-title">{artist.type}</h2>
				<h1 className="title">{artist.name}</h1>
				<p className="details">{artist.followers} fans</p>
			</div>
			<PlayButton uri={artist.player_uri} />
		</header>
	)
}

export default ArtistHeader;
