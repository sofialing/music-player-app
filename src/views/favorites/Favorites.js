import './Favorites.scss';
import TopArtists from '../../components/dashboard/TopArtists';
import TopTracks from '../../components/dashboard/TopTracks';

const Favorites = () => {
	return (
		<main id="favorites" className="main-view">
			<header className="header">
				<h1 className="title">Your favorite music</h1>
			</header>
			<TopArtists />
			<TopTracks />
		</main>
	)
}

export default Favorites;
