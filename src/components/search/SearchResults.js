import React from 'react'
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AlbumListItem from '../partials/AlbumListItem';
import ArtistListItem from '../partials/ArtistListItem';
import TrackListItem from '../partials/TrackListItem';
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
			<section className="albums">
				<header className="header">
					<h3 className="title">Albums</h3>
				</header>
				{albums.total ? (
					<ul className="list">
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
			<section className="tracks">
				<header className="header">
					<h3 className="title">Tracks</h3>
				</header>
				{tracks.total ? (
					<ul className="list">
						{tracks.items.map((track, index) => <TrackListItem track={track} album={track.album} key={index} />)}
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

export default SearchResults
