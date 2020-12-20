import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from '../playlist/TrackListItem';
import { usePlayer } from '../../contexts/PlayerContext';

const Playlist = () => {
	const { playlistId } = useParams();
	const navigate = useNavigate();
	const { spotify } = usePlayer();
	const [playlist, setPlaylist] = useState(null);

	useEffect(() => {
		if (spotify) {
			spotify.getPlaylist(playlistId).then(playlist => setPlaylist(playlist));
		} else {
			navigate('/redirect');
		}
	}, [playlistId, spotify, navigate])

	return playlist && (
		<div className="playlist">
			<header className="playlist__header">
				<div className="playlist__header__inner">
					<ArrowBackIosIcon onClick={() => navigate(-1)} />
					<img src={playlist.images[0]['url']} alt={`album cover for ${playlist.name}`} />
					<h1>{playlist.name}</h1>
					<p>by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks &middot; {playlist.followers.total} followers</p>
				</div>
				<button className="playlist__play-btn">
					<PlaylistPlayIcon />
					<span>Play</span>
				</button>
			</header>
			<div className="container">
				<ul className="track-list">
					{playlist.tracks.items.map((item, index) => <TrackListItem key={index} track={item.track} />)}
				</ul>
			</div>
		</div>
	)
}

export default Playlist
