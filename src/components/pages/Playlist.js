import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from '../elements/TrackListItem';
import { useAuth } from '../../contexts/AuthContext';

const Playlist = () => {
	const { playlistId } = useParams();
	const navigate = useNavigate();
	const { spotify } = useAuth();
	const [playlist, setPlaylist] = useState(null);

	useEffect(() => {
		if (spotify) {
			spotify.getPlaylist(playlistId).then(playlist => setPlaylist(playlist));
		} else {
			navigate('/redirect');
		}
	}, [playlistId, spotify, navigate])

	return playlist && (
		<main className="playlist-page">
			<header className="playlist-page__header">
				<div className="playlist-page__header__inner">
					<ArrowBackIosIcon onClick={() => navigate(-1)} />
					<img src={playlist.images[0]['url']} alt={`album cover for ${playlist.name}`} />
					<h1>{playlist.name}</h1>
					<p>by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks &middot; {parseInt(playlist.followers.total).toLocaleString()} followers</p>
				</div>
				<button className="playlist-page__play-btn">
					<PlaylistPlayIcon />
					<span>Play</span>
				</button>
			</header>
			<section>
				<ul>
					{playlist.tracks.items.map((playlist, index) => <TrackListItem key={index} track={playlist.track} album={playlist.track.album} />)}
				</ul>
			</section>
		</main>
	)
}

export default Playlist
