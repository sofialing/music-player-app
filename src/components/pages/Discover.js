import NewReleases from '../discover/NewReleases'
import FeaturedPlaylists from '../discover/FeaturedPlaylists'
import Categories from '../discover/Categories'
import Recommendations from '../discover/Recommendations'

const Discover = () => {
	return (
		<main className="main-view discover-page">
			<header>
				<h1>Discover</h1>
			</header>
			<Recommendations />
			<NewReleases />
			<FeaturedPlaylists />
			<Categories />
		</main>
	)
}

export default Discover
