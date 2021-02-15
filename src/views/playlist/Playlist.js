import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from 'components/partials/track/TrackListItem';
import PlayButton from 'components/partials/PlayButton';
import { getPlaylist, getPlaylistTracks } from 'services/spotifyAPI'
import './Playlist.scss';
import Spinner from 'components/partials/Spinner';

const Playlist = () => {
	const navigate = useNavigate();
	const { playlistId } = useParams();
	const [playlist, setPlaylist] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const FETCH_DATA = [
			getPlaylist(playlistId),
			getPlaylistTracks(playlistId)
		];
		Promise.all(FETCH_DATA)
			.then(data => {
				const [playlist, tracks] = data;
				setPlaylist(playlist);
				setTracks(tracks);
				setLoading(false);
			})
			.catch(error => console.log(error))
	}, [playlistId])

	if (loading) {
		return <Spinner />;
	}

	return playlist && (
		<main id="playlist" className="main-view">
			<header className="header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} role="button" title="Go back" />
				<img className="cover-img" src={playlist.image_url} alt="playlist cover" />
				<div>
					<h2 className="sub-title">{playlist.type}</h2>
					<h1 className="title">{playlist.name}</h1>
					<p className="desc">{playlist.description}</p>
					<p className="details">
						by {playlist.owner} &middot; {playlist.total_tracks} tracks &middot; {playlist.followers} followers
					</p>
				</div>
				<PlayButton uri={playlist.player_uri} />
			</header>
			<section className="tracks">
				<ul>
					{tracks.items.map(track => <TrackListItem key={track.id} track={track} album={track.album} />)}
				</ul>
			</section>
		</main>
	)
}

export default Playlist;
