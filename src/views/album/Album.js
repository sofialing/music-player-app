import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TrackListItem from 'components/partials/track/TrackListItem';
import PlayButton from 'components/partials/PlayButton';
import { useAuth } from 'contexts/AuthContext';
import { getArtists, getYear, getAlbumLength, getTracks } from 'utils';
import './Album.scss';

const Album = () => {
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
		<main id="album" className="main-view">
			<header className="header">
				<ArrowBackIosIcon className="back-btn" onClick={() => navigate(-1)} />
				<img className="cover-img" src={album.images[0]['url']} alt='album cover' />
				<div>
					<h2 className="sub-title">{album.album_type}</h2>
					<h1 className="title">{album.name}</h1>
					<p className="desc">{getArtists(album.artists)} &middot; {getYear(album.release_date)}</p>
					<p className="details">{getTracks(album.total_tracks)} &middot; {getAlbumLength(album.tracks)} minutes</p>
				</div>
				<PlayButton uri={album.uri} />
			</header>
			<section className="tracks">
				<ul>
					{tracks.map((track, index) => (
						<TrackListItem track={track} album={album} displayAlbumTitle={false} key={index} />
					))}
				</ul>
			</section>
		</main>
	)
}

export default Album;
