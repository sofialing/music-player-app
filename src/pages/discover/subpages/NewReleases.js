import { useEffect, useState } from 'react';
import { getNewReleases } from 'services/spotifyAPI';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/layout/navigation/Pagination';
import ErrorView from 'components/layout/views/ErrorView';
import LoadingView from 'components/layout/views/LoadingView';
import MainView from 'components/layout/views/MainView';
import PageHeader from 'components/layout/sections/PageHeader';
import GridSection from 'components/layout/sections/GridSection';

const NewReleases = () => {
	const [releases, setReleases] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { nextPage, prevPage, currentPage, maxPage, limit } = usePagination(releases, 24);

	useEffect(() => {
		getNewReleases({ limit, offset: (currentPage - 1) * limit })
			.then(releases => {
				setReleases(releases);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			})

	}, [currentPage, limit])


	if (loading) {
		return <LoadingView />;
	}

	if (error) {
		return <ErrorView />;
	}

	return (
		<MainView id="new-releases" pageTitle="New releases">
			<PageHeader title="New albums & singles" />
			<GridSection items={releases.items} limit={releases.limit} />
			<Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} maxPage={maxPage} />
		</MainView>
	)
}

export default NewReleases;
