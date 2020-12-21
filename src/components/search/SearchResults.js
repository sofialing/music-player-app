import React from 'react'
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumListItem from './AlbumListItem';
import ArtistListItem from './ArtistListItem';
import TrackListItem from './TrackListItem';

const SearchResults = ({ searchResults, search }) => {
	const { albums, artists, tracks } = searchResults;
	return (
		<div className="search-results">
			<section>
				<header>
					<h3>Artists</h3>
				</header>
				{artists.total ? (
					<ul className="search-results__artist">
						{artists.items.map((artist, index) => <ArtistListItem artist={artist} key={index} />)}
					</ul>
				) : <p>No artists found for '{search}'.</p>}
				{artists.next ? (
					<footer>
						<Link to={`artists`}>View all artists</Link>
						<ChevronRightIcon />
					</footer>
				) : ''}
			</section>
			<section>
				<header>
					<h3>Albums</h3>
				</header>
				{albums.total ? (
					<ul className="search-results__albums">
						{albums.items.map((album, index) => <AlbumListItem album={album} key={index} />)}
					</ul>
				) : <p>No albums found for '{search}'.</p>}
				{albums.next ? (
					<footer>
						<Link to={`albums`}>View all albums</Link>
						<ChevronRightIcon />
					</footer>

				) : ''}
			</section>
			<section>
				<header>
					<h3>Tracks</h3>
				</header>
				{tracks.total ? (
					<ul className="search-results__tracks">
						{tracks.items.map((track, index) => <TrackListItem track={track} key={index} />)}
					</ul>
				) : <p>No tracks found for '{search}'.</p>}
				{tracks.next ? (
					<footer>
						<Link to={`tracks`}>View all tracks</Link>
						<ChevronRightIcon />
					</footer>
				) : ''}
			</section>
		</div >
	)
}

export default SearchResults
