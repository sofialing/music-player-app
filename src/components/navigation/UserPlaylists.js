import { Link } from 'react-router-dom';

const UserPlaylists = ({ user_playlists }) => {
	if (!user_playlists || !user_playlists.total) {
		return <p>No playlists to display</p>;
	}

	return user_playlists && (
		<ul className="navbar__playlists--list">
			{user_playlists.items.map(playlist => (
				<li className="navbar__playlists--list-item" key={playlist.id}>
					<Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
				</li>
			))}
		</ul>
	)
}

export default UserPlaylists;
