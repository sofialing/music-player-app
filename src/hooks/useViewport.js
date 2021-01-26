import { useContext } from 'react';
import { ViewportContext } from '../contexts/ViewportContext'

const useViewport = () => {
	const { height, width } = useContext(ViewportContext);
	const breakpoint = 768;

	return { breakpoint, height, width };
}

export default useViewport;
