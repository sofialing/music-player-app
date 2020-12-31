import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from '../elements/TrackListItem';
import PlayButton from '../elements/PlayButton';
import { useAuth } from '../../contexts/AuthContext';
import { formatNumber } from '../../utils'

const Playlist = () => {
	const navigate = useNavigate();
	const { playlistId } = useParams();
	const { spotify } = useAuth();
	const [playlist, setPlaylist] = useState(null);

	useEffect(() => {
		spotify.getPlaylist(playlistId)
			.then(playlist => setPlaylist(playlist))
			.catch(error => console.log(error));
	}, [playlistId, spotify])

	return playlist && (
		<main className="playlist-page">
			<header className="playlist-page__header">
				<div className="playlist-page__header__inner">
					<ArrowBackIosIcon onClick={() => navigate(-1)} />
					<img src={playlist.images[0]['url']} alt={`album cover for ${playlist.name}`} />
					<h1>{playlist.name}</h1>
					<p>by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks &middot; {formatNumber(playlist.followers.total)} followers</p>
				</div>
				<PlayButton uri={playlist.uri} />
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
