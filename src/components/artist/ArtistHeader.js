import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PlayButton from '../elements/PlayButton';
import { formatNumber } from '../../utils'

const ArtistHeader = ({ artist }) => {
	const navigate = useNavigate();

	return (
		<header className="artist-page__header">
			<div className="artist-page__header__inner">
				<ArrowBackIosIcon onClick={() => navigate(-1)} />
				<img src={artist.images[1]['url']} alt={artist.name} />
				<h1>{artist.name}</h1>
				<p>{formatNumber(artist.followers.total)} fans</p>
			</div>
			<PlayButton uri={artist.uri} />
		</header>
	)
}

export default ArtistHeader
