import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../../contexts/PlayerContext';
import ArtistListItem from '../../elements/ArtistListItem';

const AllRelatedArtists = () => {
	const navigate = useNavigate();
	const { artistId } = useParams();
	const { spotify } = usePlayer();
	const [artist, setArtist] = useState(null);
	const [relatedArtists, setRelatedArtists] = useState(null);

	useEffect(() => {
		spotify.getArtist(artistId)
			.then(data => setArtist(data.name))
			.catch(error => console.log(error))
		spotify.getArtistRelatedArtists(artistId)
			.then(data => setRelatedArtists(data.artists))
			.catch(error => console.log(error))
	}, [artistId, spotify])

	return (
		<main className="related-artists-page">
			<header className="related-artists-page__header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<h1>{artist && `${artist} – related artists`}</h1>
			</header>
			<section>
				<ul>
					{relatedArtists && relatedArtists.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
				</ul>
			</section>

		</main>
	)
}

export default AllRelatedArtists
