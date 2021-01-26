import NewReleases from 'components/discover/NewReleases';
import FeaturedPlaylists from 'components/discover/FeaturedPlaylists';
import Categories from 'components/discover/Categories';
import Recommendations from 'components/discover/Recommendations';
import './Discover.scss';

const Discover = () => {
	return (
		<main id="discover" className="main-view">
			<header className="header">
				<h1 className="title">Discover new music</h1>
			</header>
			<Recommendations />
			<NewReleases />
			<FeaturedPlaylists />
			<Categories />
		</main>
	)
}

export default Discover;
