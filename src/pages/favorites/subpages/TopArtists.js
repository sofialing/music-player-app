import { useAuth } from 'contexts/AuthContext';
import MainView from 'components/views/MainView';
import PageHeader from 'components/sections/PageHeader';
import GridSection from 'components/sections/GridSection';

const TopArtists = () => {
	const { top_artists } = useAuth();

	return (
		<MainView id="top-artists" pageTitle="Top artists">
			<PageHeader title="Your top artists" />
			<GridSection items={top_artists.items} limit={top_artists.limit} />
		</MainView>
	)
}

export default TopArtists;
