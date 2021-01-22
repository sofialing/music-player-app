import TopArtists from '../dashboard/TopArtists';
import TopTracks from '../dashboard/TopTracks';

const Favorites = () => {
	return (
		<main className="main-view favorites-page">
			<header>
				<h1>Your Favorites</h1>
			</header>
			<TopArtists />
			<TopTracks />
		</main>
	)
}

export default Favorites
