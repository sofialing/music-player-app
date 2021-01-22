import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from '../elements/TrackListItem';
import PlayButton from '../elements/PlayButton';
import { useAuth } from '../../contexts/AuthContext'
import { getArtists, getYear, getAlbumLength, getTracks } from '../../utils'

const SingleAlbum = () => {
	const navigate = useNavigate();
	const { albumId } = useParams();
	const { spotify } = useAuth();
	const [album, setAlbum] = useState(null);
	const [tracks, setTracks] = useState(null);

	useEffect(() => {
		spotify.getAlbum(albumId)
			.then(data => {
				setAlbum(data)
				setTracks(data.tracks.items)
			})
			.catch(error => console.log(error));
	}, [albumId, spotify])

	return album && tracks && (
		<main className="main-view single-album-page">
			<header className="single-album-page__header">
				<div className="single-album-page__header__inner">
					<ArrowBackIosIcon onClick={() => navigate(-1)} />
					<img src={album.images[0]['url']} alt={`album cover for ${album.name}`} />
					<h1>{album.name}</h1>
					<p>with {getArtists(album.artists)} &middot; {getYear(album.release_date)}</p>
					<p>{getTracks(album.total_tracks)}, {getAlbumLength(album.tracks)} minutes</p>
				</div>
				<PlayButton uri={album.uri} />
			</header>
			<section>
				<ul>
					{tracks.map((track, index) => (
						<TrackListItem track={track} album={album} displayAlbumTitle={false} key={index} />
					))}
				</ul>
			</section>
		</main>
	)
}

export default SingleAlbum
