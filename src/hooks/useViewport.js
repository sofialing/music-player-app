import { useContext } from 'react';
import { ViewportContext } from '../contexts/ViewportContext'

const useViewport = () => {
	const { height, width } = useContext(ViewportContext);
	const breakpoint_sm = 640;
	const breakpoint_md = 768;
	const breakpoint_lg = 1024;

	return { breakpoint_sm, breakpoint_md, breakpoint_lg, height, width };
}

export default useViewport;
