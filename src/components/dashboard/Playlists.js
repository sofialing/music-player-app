import React, { useEffect } from 'react'
import { usePlayer } from '../../contexts/PlayerContext';
import PlaylistItem from './PlaylistItem';

const Playlists = () => {
	const { playlists } = usePlayer();

	return (
		<>
			<h2>Playlists</h2>
			<ul className="playlists__list">
				{playlists && playlists.items.map(playlist => <PlaylistItem playlist={playlist} />)}
			</ul>
		</>
	)
}

export default Playlists
