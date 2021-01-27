import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PlayButton from 'components/partials/PlayButton';
import { formatNumber } from 'utils'
import './ArtistHeader.scss';

const ArtistHeader = ({ artist }) => {
	const navigate = useNavigate();

	return (
		<header className="artist-header">
			<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} title="Go back" />
			<img className="cover-img" src={artist.images[0]['url']} alt={artist.name} />
			<div>
				<h2 className="sub-title">{artist.type}</h2>
				<h1 className="title">{artist.name}</h1>
				<p className="details">{formatNumber(artist.followers.total)} fans</p>
			</div>
			<PlayButton uri={artist.uri} />
		</header>
	)
}

export default ArtistHeader;
