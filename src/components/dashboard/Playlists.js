import React, { useEffect } from 'react'
import { usePlayer } from '../../contexts/PlayerContext';
import PlaylistItem from './PlaylistItem';

const Playlists = () => {
	const { playlists } = usePlayer();

	return (
		<>
			<h2>Playlists</h2>
			<ul className="playlists">
				{playlists && playlists.items.map((playlist, index) => <PlaylistItem key={index} playlist={playlist} />)}
			</ul>
		</>
	)
}

export default Playlists
