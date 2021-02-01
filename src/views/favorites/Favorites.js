import SavedTracks from 'components/favorites/SavedTracks';
import TopArtists from 'components/favorites/TopArtists';
import TopTracks from 'components/favorites/TopTracks';
import './Favorites.scss';

const Favorites = () => {
	return (
		<main id="favorites" className="main-view">
			<header className="header">
				<h1 className="title">Your favorite music</h1>
			</header>
			<TopTracks />
			<TopArtists />
			<SavedTracks />
		</main>
	)
}

export default Favorites;
