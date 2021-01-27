import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from 'components/partials/track/TrackListItem';
import PlayButton from 'components/partials/PlayButton';
import { useAuth } from 'contexts/AuthContext';
import { formatNumber } from 'utils';
import './Playlist.scss';

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
		<main id="playlist" className="main-view">
			<header className="header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} role="button" title="Go back" />
				<img className="cover-img" src={playlist.images[0]['url']} alt={`album cover for ${playlist.name}`} />
				<div>
					<h2 className="sub-title">{playlist.type}</h2>
					<h1 className="title">{playlist.name}</h1>
					<p className="desc">{playlist.description}</p>
					<p className="details">
						by {playlist.owner.display_name} &middot; {playlist.tracks.total} tracks &middot; {formatNumber(playlist.followers.total)} followers
					</p>
				</div>
				<PlayButton uri={playlist.uri} />
			</header>
			<section className="tracks">
				<ul>
					{playlist.tracks.items.map((playlist, index) => <TrackListItem key={index} track={playlist.track} album={playlist.track.album} />)}
				</ul>
			</section>
		</main>
	)
}

export default Playlist;
