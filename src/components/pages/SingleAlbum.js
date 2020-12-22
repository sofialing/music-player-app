import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { usePlayer } from '../../contexts/PlayerContext'
import AlbumTrackListItem from '../album/AlumTrackListItem';

const SingleAlbum = () => {
	const navigate = useNavigate();
	const { albumId } = useParams();
	const { spotify } = usePlayer();
	const [album, setAlbum] = useState(null);
	const [tracks, setTracks] = useState(null);
	const [duration, setDuration] = useState(null);

	useEffect(() => {
		spotify.getAlbum(albumId)
			.then(data => {
				setAlbum(data)
				setTracks(data.tracks.items)
				const durationSum = data.tracks.items.map(track => track.duration_ms).reduce((total, num) => total + num);
				setDuration(durationSum);
			})
			.catch(error => console.log(error));
	}, [albumId, spotify])

	return album && tracks && duration && (
		<main className="single-album-page">
			<header className="single-album-page__header">
				<div className="single-album-page__header__inner">
					<ArrowBackIosIcon onClick={() => navigate(-1)} />
					<img src={album.images[0]['url']} alt={`album cover for ${album.name}`} />
					<h1>{album.name}</h1>
					<p>with {album.artists.map((artist) => artist.name).join(', ')} &middot; {album.release_date.split('-')[0]}</p>
					<p>{album.total_tracks} tracks, {moment(duration).format('mm')} minutes</p>
				</div>
				<button className="playlist__play-btn">
					<PlaylistPlayIcon />
					<span>Play</span>
				</button>
			</header>
			<section className="container">
				<ul className="track-list">
					{tracks.map((track, index) => <AlbumTrackListItem track={track} album={album} key={index} />)}
				</ul>

			</section>
		</main>
	)
}

export default SingleAlbum
