import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumListItem from 'components/partials/album/AlbumListItem';
import ArtistListItem from 'components/partials/artist/ArtistListItem';
import TrackListItem from 'components/partials/track/TrackListItem';
import './SearchResults.scss';

const SearchResults = ({ searchResults, search }) => {
	const { albums, artists, tracks } = searchResults;
	return (
		<div className="results">
			<section className="artists">
				<header className="header">
					<h3 className="title">Artists</h3>
				</header>
				{artists.total ? (
					<ul className="list">
						{artists.items.map(artist => <ArtistListItem artist={artist} key={artist.id} />)}
					</ul>
				) : <p>No artists found for '{search}'.</p>}
				{artists.next ? (
					<footer>
						<Link to={`artists`}>View all artists</Link>
						<ChevronRightIcon />
					</footer>
				) : ''}
			</section>
			<section className="albums">
				<header className="header">
					<h3 className="title">Albums</h3>
				</header>
				{albums.total ? (
					<ul className="list">
						{albums.items.map(album => <AlbumListItem album={album} key={album.id} />)}
					</ul>
				) : <p>No albums found for '{search}'.</p>}
				{albums.next ? (
					<footer>
						<Link to={`albums`}>View all albums</Link>
						<ChevronRightIcon />
					</footer>

				) : ''}
			</section>
			<section className="tracks">
				<header className="header">
					<h3 className="title">Tracks</h3>
				</header>
				{tracks.total ? (
					<ul className="list">
						{tracks.items.map(track => <TrackListItem track={track} album={track.album} key={track.id} />)}
					</ul>
				) : <p>No tracks found for '{search}'.</p>}
				{tracks.next ? (
					<footer>
						<Link to={`tracks`}>View all tracks</Link>
						<ChevronRightIcon />
					</footer>
				) : ''}
			</section>
		</div>
	)
}

export default SearchResults;
