import { useAuth } from 'contexts/AuthContext';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import ListSection from 'components/layout/sections/ListSection';

const TopTracks = () => {
	const { top_tracks } = useAuth();

	return (
		<MainView id="top-tracks" pageTitle="Top tracks">
			<PageHeader title="Your top tracks" />
			<ListSection type="tracks" items={top_tracks.items} />
		</MainView>
	)
}

export default TopTracks;
